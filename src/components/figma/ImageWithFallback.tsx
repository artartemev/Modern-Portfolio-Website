import React, { useState } from 'react'

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const {
    src,
    alt,
    style,
    className,
    decoding = 'async',
    loading = 'lazy',
    ...rest
  } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full text-gray-400">
        {alt}
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      decoding={decoding}
      loading={loading}
      {...rest}
      onError={() => setDidError(true)}
    />
  )
}
