import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasErro: false, error: null }
    }

    static getDerivedStateFromState(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught:", error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div style={{ padding: 16 }}>
                        <h2>Something went wrong.</h2>
                        <button onClick={() => this.setState({ hasError: false, error: null })}>
                            Try again
                        </button>
                    </div>
                )
            );
        }
        return this.props.children;
    }

}