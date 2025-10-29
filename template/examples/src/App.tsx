import { useState, useEffect } from 'react'
import { <%= sdkName %> } from '<%= sdkName %>'
import './App.css'

function App() {
  const [sdk] = useState(() => new <%= sdkName %>({
    baseUrl: 'https://api.example.com',
    debug: true
  }))
  
  const [config, setConfig] = useState(sdk.getConfig())
  const [result, setResult] = useState<string>('')

  useEffect(() => {
    // Example of using the SDK
    const example = async () => {
      try {
        // Replace with actual SDK method calls
        console.log('SDK initialized with config:', config)
        setResult('SDK initialized successfully!')
      } catch (error) {
        console.error('SDK error:', error)
        setResult('SDK initialization failed')
      }
    }
    
    example()
  }, [config])

  const handleConfigUpdate = () => {
    sdk.updateConfig({ 
      timeout: 10000,
      debug: !config.debug 
    })
    setConfig(sdk.getConfig())
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1><%= sdkName %> Example</h1>
        
        <div className="config-section">
          <h2>Current Configuration</h2>
          <pre>{JSON.stringify(config, null, 2)}</pre>
          <button onClick={handleConfigUpdate}>
            Toggle Debug & Update Timeout
          </button>
        </div>
        
        <div className="result-section">
          <h2>SDK Result</h2>
          <p>{result}</p>
        </div>
        
        <div className="usage-section">
          <h2>Usage Example</h2>
          <code>
            {`const sdk = new ${config.sdkName || 'SDK'}({
  baseUrl: '${config.baseUrl}',
  debug: ${config.debug}
});`}
          </code>
        </div>
      </header>
    </div>
  )
}

export default App




