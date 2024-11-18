'use client'
import Image from "next/image";
import  { Component } from "react";
import { useRouter } from "next/router";
import Button from "./Button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   console.error("ErrorBoundary caught an error", error, errorInfo);
  // }

  resetError = () => {
    this.setState({ hasError: false });
    const router = useRouter();
    router.push("dashboard/overview");
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen px-6">
          {/* <Image
            src="/images/error-img.svg"
            height={100}
            width={400}
            alt="Error illustration"
            className="w-60 h-40"
          /> */}
          <h2 className="text-xl font-bold text-gray-700">Ooops!! Something went wrong</h2>
          <p className="text-base text-gray-600 text-center">
            We cannot load this page at the moment. Please try again later.
          </p>
          <Button
            onClick={this.resetError}
            className="mt-4 bg-gradient-to-b from-primary to-primary/20 py-2 px-6 text-white"
          >
            Go Back to Dashboard
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
