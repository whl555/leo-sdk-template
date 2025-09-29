#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, description) {
  log(`\n🔄 ${description}...`, 'cyan');
  try {
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} 完成`, 'green');
  } catch (error) {
    log(`❌ ${description} 失败`, 'red');
    process.exit(1);
  }
}

function checkPrerequisites() {
  log('\n📋 检查发布前提条件...', 'blue');

  // 检查npm登录状态
  try {
    execSync('npm whoami', { stdio: 'pipe' });
    log('✅ NPM账户已登录', 'green');
  } catch (error) {
    log('❌ 未登录NPM账户，请先运行: npm login', 'red');
    process.exit(1);
  }

  // 检查npm registry
  try {
    const registry = execSync('npm config get registry', { encoding: 'utf8' }).trim();
    if (!registry.includes('registry.npmjs.org')) {
      log('⚠️  当前registry不是官方NPM registry', 'yellow');
      log(`当前registry: ${registry}`, 'yellow');
      log('建议设置为官方registry: npm config set registry https://registry.npmjs.org/', 'yellow');
    } else {
      log('✅ NPM registry配置正确', 'green');
    }
  } catch (error) {
    log('⚠️  无法检查NPM registry配置', 'yellow');
  }

  // 检查Git状态
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      log('❌ Git工作区不干净，请先提交所有更改', 'red');
      log('未提交的文件:', 'yellow');
      console.log(status);
      process.exit(1);
    }
    log('✅ Git工作区干净', 'green');
  } catch (error) {
    log('⚠️  无法检查Git状态，请确保在Git仓库中', 'yellow');
  }

  // 检查必要文件
  const requiredFiles = ['package.json', 'README.md', 'tsconfig.json', 'src/generator.ts', 'bin/index.js'];
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      log(`❌ 缺少必要文件: ${file}`, 'red');
      process.exit(1);
    }
  }
  log('✅ 必要文件检查通过', 'green');

  // 检查模板文件
  const templateFiles = ['template/core', 'template/examples', 'template/ci'];
  for (const dir of templateFiles) {
    if (!fs.existsSync(dir)) {
      log(`⚠️  模板目录不存在: ${dir}`, 'yellow');
    }
  }
  log('✅ 模板文件检查完成', 'green');
}

function updateVersion(versionType) {
  if (!versionType) {
    log('⚠️  未指定版本类型，跳过版本更新', 'yellow');
    return;
  }

  const validTypes = ['patch', 'minor', 'major'];
  if (!validTypes.includes(versionType)) {
    log(`❌ 无效的版本类型: ${versionType}. 有效类型: ${validTypes.join(', ')}`, 'red');
    process.exit(1);
  }

  execCommand(`npm version ${versionType}`, `更新版本 (${versionType})`);
}

function runTests() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.scripts && packageJson.scripts.test) {
    execCommand('npm test', '运行测试');
  } else {
    log('⚠️  未找到测试脚本，跳过测试', 'yellow');
  }
}

function runLint() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.scripts && packageJson.scripts.lint) {
    execCommand('npm run lint', '代码检查');
  } else {
    log('⚠️  未找到lint脚本，跳过代码检查', 'yellow');
  }
}

function build() {
  execCommand('npm run build', '构建项目');

  // 检查构建输出
  if (!fs.existsSync('dist')) {
    log('❌ 构建后未找到dist目录', 'red');
    process.exit(1);
  }

  // 检查关键文件（CLI工具的构建输出）
  const distFiles = ['generator.js', 'generator.d.ts'];
  for (const file of distFiles) {
    if (!fs.existsSync(path.join('dist', file))) {
      log(`❌ 构建后未找到关键文件: dist/${file}`, 'red');
      process.exit(1);
    }
  }
  log('✅ 构建文件检查通过', 'green');
}

function testCLI() {
  log('\n🧪 测试CLI工具...', 'magenta');
  try {
    // 测试CLI工具是否可以正常运行
    execSync('node bin/index.js --help', { stdio: 'pipe' });
    log('✅ CLI工具测试通过', 'green');
  } catch (error) {
    log('❌ CLI工具测试失败', 'red');
    process.exit(1);
  }
}

function dryRun() {
  log('\n🧪 执行发布预检...', 'magenta');
  try {
    const output = execSync('npm pack --dry-run', { encoding: 'utf8' });
    log('✅ 发布预检通过', 'green');
    
    // 显示将要发布的文件
    const lines = output.split('\n').filter(line => line.startsWith('npm notice'));
    if (lines.length > 0) {
      log('\n📦 将要发布的文件:', 'cyan');
      lines.forEach(line => {
        console.log(line);
      });
    }
  } catch (error) {
    log('❌ 发布预检失败', 'red');
    process.exit(1);
  }
}

function checkPackageName() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const packageName = packageJson.name;
  
  log(`\n🔍 检查包名 "${packageName}" 是否可用...`, 'cyan');
  
  try {
    execSync(`npm view ${packageName}`, { stdio: 'pipe' });
    log(`⚠️  包名 "${packageName}" 已存在于NPM`, 'yellow');
    log('如果这是您的包，请确保版本号已更新', 'yellow');
  } catch (error) {
    if (error.status === 404) {
      log(`✅ 包名 "${packageName}" 可用`, 'green');
    } else {
      log('⚠️  无法检查包名可用性', 'yellow');
    }
  }
}

function publish() {
  log('\n🚀 发布到NPM...', 'magenta');

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const packageName = packageJson.name;
  const version = packageJson.version;

  log(`正在发布: ${packageName}@${version}`, 'cyan');

  try {
    execSync('npm publish --access public', { stdio: 'inherit' });
    log(`\n🎉 成功发布 ${packageName}@${version} 到NPM!`, 'green');
    log(`📦 包地址: https://www.npmjs.com/package/${packageName}`, 'cyan');
    log(`📥 安装命令: npm install -g ${packageName}`, 'cyan');
    log(`🚀 使用命令: leo-sdk <project-name>`, 'cyan');
  } catch (error) {
    log('❌ 发布失败', 'red');
    process.exit(1);
  }
}

function pushToGit() {
  try {
    execCommand('git push', '推送代码到远程仓库');
    execCommand('git push --tags', '推送标签到远程仓库');
  } catch (error) {
    log('⚠️  推送到Git失败，但NPM发布已成功', 'yellow');
  }
}

function main() {
  const versionType = process.argv[2];

  log('🚀 Leo SDK Template 发布流程开始', 'bright');
  log('=======================================', 'bright');

  try {
    checkPrerequisites();
    updateVersion(versionType);
    runLint();
    runTests();
    build();
    testCLI();
    checkPackageName();
    dryRun();

    log('\n⚠️  准备发布到NPM，这个操作不可逆！', 'yellow');
    log('按 Ctrl+C 取消，或按 Enter 继续...', 'yellow');
    
    // 等待用户确认
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    await new Promise((resolve) => {
      rl.question('', () => {
        rl.close();
        resolve();
      });
    });

    publish();
    pushToGit();

    log('\n🎉 发布流程完成！', 'green');
    log('=======================================', 'bright');
    log('\n📚 后续步骤:', 'cyan');
    log('1. 验证包是否可以正常安装: npm install -g leo-sdk-template', 'cyan');
    log('2. 测试CLI工具: leo-sdk test-project --defaults', 'cyan');
    log('3. 更新文档和示例', 'cyan');
  } catch (error) {
    log(`\n❌ 发布流程失败: ${error.message}`, 'red');
    process.exit(1);
  }
}

process.on('SIGINT', () => {
  log('\n\n❌ 发布流程被用户中断', 'red');
  process.exit(1);
});

if (require.main === module) {
  main();
}

module.exports = {
  checkPrerequisites,
  updateVersion,
  runTests,
  runLint,
  build,
  testCLI,
  publish
};
