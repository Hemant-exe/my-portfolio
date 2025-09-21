"use client"

import BlockchainPortfolio from "../portfolio"
import ErrorBoundary from "../components/ErrorBoundary"

export default function SyntheticV0PageForDeployment() {
  return (
    <ErrorBoundary>
      <BlockchainPortfolio />
    </ErrorBoundary>
  )
}