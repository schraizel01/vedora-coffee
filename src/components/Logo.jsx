const _jsxFileName = "src\\components\\Logo.tsx";import React from 'react';







export const LogoMark = ({ className = 'w-8 h-8' }) => (
  React.createElement('svg', {
    viewBox: "0 0 40 40"   ,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    'aria-hidden': "true", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10}}

    /* Minimal geometric cup with subtle cat ears */
    , React.createElement('path', {
      d: "M8 16L11 8L17 13H23L29 8L32 16V22C32 28.6274 26.6274 34 20 34C13.3726 34 8 28.6274 8 22V16Z"               ,
      stroke: "#F3E9DC",
      strokeWidth: "2.4",
      strokeLinejoin: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 18}}
    )
    /* Cup handle */
    , React.createElement('path', {
      d: "M32 18H34.5C36.433 18 38 19.567 38 21.5C38 23.433 36.433 25 34.5 25H31.5"           ,
      stroke: "#E58A33",
      strokeWidth: "2.4",
      strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}
    )
    /* Subtle caramel coffee steam / cat whiskers accent */
    , React.createElement('path', {
      d: "M16 21.5C16 21.5 18 23.5 20 23.5C22 23.5 24 21.5 24 21.5"           ,
      stroke: "#E58A33",
      strokeWidth: "2.2",
      strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
    )
    , React.createElement('circle', { cx: "15.5", cy: "18", r: "1.3", fill: "#F3E9DC", __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}} )
    , React.createElement('circle', { cx: "24.5", cy: "18", r: "1.3", fill: "#F3E9DC", __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}} )
  )
);

export const Logo = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
}) => {
  const markSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-8 h-8';

  if (variant === 'icon') {
    return React.createElement(LogoMark, { className: `${markSize} ${className}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}} );
  }

  if (variant === 'stacked') {
    return (
      React.createElement('div', { className: `inline-flex flex-col items-center text-center gap-1.5 ${className}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}
        , React.createElement(LogoMark, { className: size === 'lg' ? 'w-12 h-12' : 'w-10 h-10', __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}} )
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}
          , React.createElement('div', { className: "font-serif font-semibold text-text-primary tracking-tight text-xl leading-tight"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}}, "Vedora Coffee"

          )
          , React.createElement('div', { className: "text-[11px] uppercase tracking-[0.18em] text-text-secondary font-medium"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}, "Cat, Coffee & Eatery"

          )
        )
      )
    );
  }

  return (
    React.createElement('div', { className: `inline-flex items-center gap-2.5 ${className}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 71}}
      , React.createElement(LogoMark, { className: markSize, __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}} )
      , React.createElement('div', { className: "leading-none", __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}
        , React.createElement('div', {
          className: `font-serif font-semibold text-text-primary tracking-tight ${
            size === 'sm' ? 'text-base' : 'text-lg'
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}
, "Vedora Coffee"

        )
        , size !== 'sm' && (
          React.createElement('div', { className: "text-[10px] uppercase tracking-[0.16em] text-text-secondary font-medium mt-0.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}}, "Cat, Coffee & Eatery"

          )
        )
      )
    )
  );
};
