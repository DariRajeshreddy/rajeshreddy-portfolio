import React, { Component } from 'react';
import type { ReactNode } from 'react';


interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("3D Context Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="h-full w-full flex items-center justify-center bg-slate-950 text-slate-500 p-8 text-center border border-white/5 rounded-3xl">
          <p>The 3D content could not be displayed due to hardware limits. The rest of the site remains functional.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
