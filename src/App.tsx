import React, { useState } from 'react';
import { Upload, FileText, Download, Play, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

interface LintResult {
  tool: string;
  issues: Array<{
    line: number;
    column: number;
    severity: 'error' | 'warning' | 'info';
    message: string;
    rule: string;
  }>;
  stats: {
    errors: number;
    warnings: number;
    info: number;
  };
}

function App() {
  const [code, setCode] = useState('');
  const [fileName, setFileName] = useState('');
  const [isLintingLoading, setIsLintingLoading] = useState(false);
  const [results, setResults] = useState<LintResult[]>([]);
  const [activeTab, setActiveTab] = useState('pylint');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.py')) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target?.result as string || '');
      };
      reader.readAsText(file);
    }
  };

  const runLinting = async () => {
    if (!code.trim()) return;
    
    setIsLintingLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock linting results
    const mockResults: LintResult[] = [
      {
        tool: 'pylint',
        issues: [
          {
            line: 5,
            column: 12,
            severity: 'warning',
            message: 'Line too long (87/79)',
            rule: 'C0301'
          },
          {
            line: 12,
            column: 1,
            severity: 'error',
            message: 'Missing module docstring',
            rule: 'C0114'
          }
        ],
        stats: { errors: 1, warnings: 1, info: 0 }
      },
      {
        tool: 'flake8',
        issues: [
          {
            line: 5,
            column: 80,
            severity: 'error',
            message: 'line too long (87 > 79 characters)',
            rule: 'E501'
          },
          {
            line: 8,
            column: 1,
            severity: 'warning',
            message: 'blank line contains whitespace',
            rule: 'W293'
          }
        ],
        stats: { errors: 1, warnings: 1, info: 0 }
      },
      {
        tool: 'bandit',
        issues: [
          {
            line: 15,
            column: 8,
            severity: 'warning',
            message: 'Use of insecure MD5 hash function',
            rule: 'B303'
          }
        ],
        stats: { errors: 0, warnings: 1, info: 0 }
      }
    ];
    
    setResults(mockResults);
    setIsLintingLoading(false);
  };

  const downloadReport = () => {
    const report = results.map(result => {
      let content = `\n=== ${result.tool.toUpperCase()} RESULTS ===\n`;
      content += `Errors: ${result.stats.errors}, Warnings: ${result.stats.warnings}, Info: ${result.stats.info}\n\n`;
      
      result.issues.forEach(issue => {
        content += `Line ${issue.line}:${issue.column} [${issue.severity.toUpperCase()}] ${issue.message} (${issue.rule})\n`;
      });
      
      return content;
    }).join('\n');

    const blob = new Blob([`CodeLintHub Report\nFile: ${fileName || 'untitled.py'}\n${report}`], {
      type: 'text/plain'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codelinthub-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-amber-50 border-amber-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const activeResult = results.find(r => r.tool === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CodeLintHub</h1>
                <p className="text-sm text-gray-600">Python Code Quality Analysis</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Python Code Input</h2>
              
              {/* File Upload */}
              <div className="mb-4">
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                  <div className="space-y-2 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Upload a Python file</span>
                      <span className="block">or drag and drop</span>
                    </div>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".py"
                    onChange={handleFileUpload}
                  />
                </label>
                {fileName && (
                  <p className="mt-2 text-sm text-gray-600">
                    Loaded: <span className="font-medium">{fileName}</span>
                  </p>
                )}
              </div>

              <div className="text-center text-gray-500 mb-4">or</div>

              {/* Code Textarea */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Paste your Python code
                </label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="def hello_world():&#10;    print('Hello, World!')&#10;&#10;if __name__ == '__main__':&#10;    hello_world()"
                  className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
                />
                <div className="text-xs text-gray-500">
                  Lines: {code.split('\n').length} | Characters: {code.length}
                </div>
              </div>

              {/* Run Button */}
              <button
                onClick={runLinting}
                disabled={!code.trim() || isLintingLoading}
                className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
              >
                {isLintingLoading ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Running Analysis...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Run Linting Analysis</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Analysis Results</h2>
                  {results.length > 0 && (
                    <button
                      onClick={downloadReport}
                      className="flex items-center space-x-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Report</span>
                    </button>
                  )}
                </div>
              </div>

              {results.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No analysis results yet</p>
                  <p className="text-sm">Upload or paste Python code and click "Run Linting Analysis"</p>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex border-b">
                    {results.map((result) => (
                      <button
                        key={result.tool}
                        onClick={() => setActiveTab(result.tool)}
                        className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === result.tool
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {result.tool}
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          result.stats.errors > 0 
                            ? 'bg-red-100 text-red-800'
                            : result.stats.warnings > 0 
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {result.stats.errors + result.stats.warnings + result.stats.info}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Results Content */}
                  <div className="p-6">
                    {activeResult && (
                      <>
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center p-3 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">{activeResult.stats.errors}</div>
                            <div className="text-sm text-red-600">Errors</div>
                          </div>
                          <div className="text-center p-3 bg-amber-50 rounded-lg">
                            <div className="text-2xl font-bold text-amber-600">{activeResult.stats.warnings}</div>
                            <div className="text-sm text-amber-600">Warnings</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{activeResult.stats.info}</div>
                            <div className="text-sm text-blue-600">Info</div>
                          </div>
                        </div>

                        {/* Issues List */}
                        <div className="space-y-3">
                          {activeResult.issues.length === 0 ? (
                            <div className="text-center py-8 text-green-600">
                              <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                              <p className="font-medium">No issues found!</p>
                              <p className="text-sm text-gray-600">Your code looks clean.</p>
                            </div>
                          ) : (
                            activeResult.issues.map((issue, index) => (
                              <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                                <div className="flex items-start space-x-3">
                                  {getSeverityIcon(issue.severity)}
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="text-sm font-medium text-gray-900">
                                        Line {issue.line}:{issue.column}
                                      </span>
                                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                        {issue.rule}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700">{issue.message}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>CodeLintHub - Python Code Quality Analysis Tool</p>
          <p className="mt-1">Built for production-ready code linting workflow</p>
        </footer>
      </div>
    </div>
  );
}

export default App;