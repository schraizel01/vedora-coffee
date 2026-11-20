const _jsxFileName = "src\\components\\ui.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Info, X, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';










export const Button = ({
  variant = 'primary',
  fullWidth = false,
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-sans font-semibold transition-colors cursor-pointer select-none disabled:opacity-45 disabled:cursor-not-allowed';
  const sizing =
    size === 'sm'
      ? 'h-10 px-4 text-[14px] leading-[18px] rounded-[12px]'
      : 'h-12 px-5 text-[15px] leading-[20px] rounded-[12px]';
  const width = fullWidth ? 'w-full' : '';

  const variants = {
    primary: 'bg-accent-500 text-on-accent hover:bg-accent-600 active:bg-accent-600',
    secondary:
      'border border-brown-300 text-text-primary bg-transparent hover:bg-bg-elevated active:bg-bg-elevated',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/60 bg-transparent',
    destructive:
      'bg-status-danger/16 text-status-danger border border-status-danger/30 hover:bg-status-danger/25',
  };

  return (
    React.createElement('button', {
      disabled: disabled || loading,
      className: `${base} ${sizing} ${width} ${variants[variant]} ${className}`,
      ...rest, __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}

      , loading ? (
        React.createElement('span', { className: "inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}} )
      ) : null
      , children
    )
  );
};

 

export const Badge



 = ({ tone = 'neutral', children, className = '' }) => {
  const styles = {
    success: 'bg-[#6FA876]/16 text-[#6FA876]',
    warning: 'bg-[#E0B04A]/16 text-[#E0B04A]',
    danger: 'bg-[#D2593F]/16 text-[#D2593F]',
    info: 'bg-[#7FA4C2]/16 text-[#7FA4C2]',
    accent: 'bg-[#E58A33]/16 text-[#E58A33]',
    neutral: 'bg-[#A67C5B]/16 text-[#B9A898]',
  };
  return (
    React.createElement('span', {
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-[13px] leading-[18px] font-medium whitespace-nowrap ${styles[tone]} ${className}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 71}}

      , children
    )
  );
};

export const LazyImage





 = ({ src, alt, aspectClass = 'aspect-square', className = '', imgClassName = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    React.createElement('div', { className: `relative overflow-hidden bg-bg-elevated ${aspectClass} ${className}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
      , !loaded && !error && (
        React.createElement('div', { className: "absolute inset-0 animate-pulse bg-gradient-to-r from-bg-elevated via-border-subtle/50 to-bg-elevated"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}} )
      )
      , error ? (
        React.createElement('div', { className: "absolute inset-0 flex items-center justify-center text-text-muted text-xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}, "Gambar tidak tersedia"

        )
      ) : (
        React.createElement('img', {
          src: src,
          alt: alt,
          loading: "lazy",
          onLoad: () => setLoaded(true),
          onError: () => setError(true),
          className: `w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
        )
      )
    )
  );
};

export const BottomSheet




 = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    React.createElement('div', { className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}
      , React.createElement('div', {
        className: "fixed inset-0 bg-black/70 backdrop-blur-[2px]"   ,
        onClick: onClose,
        'aria-hidden': "true", __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}
      )
      , React.createElement('div', { className: "relative z-10 w-full sm:max-w-md bg-bg-elevated border border-border-subtle rounded-t-[20px] sm:rounded-[20px] shadow-2xl max-h-[88vh] flex flex-col pb-safe"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}
        , React.createElement('div', { className: "flex justify-center pt-3 pb-1 sm:hidden"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
          , React.createElement('div', { className: "w-10 h-1 rounded-full bg-border-subtle"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}} )
        )
        , title && (
          React.createElement('div', { className: "flex items-center justify-between px-5 py-3.5 border-b border-border-subtle"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}
            , React.createElement('h3', { className: "font-sans font-semibold text-[18px] text-text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}, title)
            , React.createElement('button', {
              onClick: onClose,
              className: "w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-bg-surface cursor-pointer"         ,
              'aria-label': "Tutup", __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}

              , React.createElement(X, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}} )
            )
          )
        )
        , React.createElement('div', { className: "overflow-y-auto p-5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}, children)
      )
    )
  );
};

export const ConfirmDialog








 = ({
  open,
  title,
  description,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  destructive = false,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;
  return (
    React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center p-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 171}}
      , React.createElement('div', { className: "fixed inset-0 bg-black/75"  , onClick: onCancel, 'aria-hidden': "true", __self: this, __source: {fileName: _jsxFileName, lineNumber: 172}} )
      , React.createElement('div', { className: "relative z-10 w-full max-w-sm bg-bg-elevated border border-border-subtle rounded-[16px] p-6 shadow-2xl"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}}
        , React.createElement('h3', { className: "font-sans font-semibold text-[20px] leading-[28px] text-text-primary mb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}
          , title
        )
        , React.createElement('p', { className: "text-[14px] leading-[22px] text-text-secondary mb-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}, description)
        , React.createElement('div', { className: "flex gap-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}
          , React.createElement(Button, { variant: "secondary", fullWidth: true, onClick: onCancel, __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
            , cancelLabel
          )
          , React.createElement(Button, {
            variant: destructive ? 'destructive' : 'primary',
            fullWidth: true,
            onClick: onConfirm, __self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}

            , confirmLabel
          )
        )
      )
    )
  );
};

export const ToastContainer = () => {
  const { toasts, dismissToast } = useApp();
  if (toasts.length === 0) return null;
  return (
    React.createElement('div', { className: "fixed bottom-20 lg:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 flex flex-col gap-2 pointer-events-none"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}}
      , toasts.map((t) => (
        React.createElement('div', {
          key: t.id,
          className: "pointer-events-auto flex items-center gap-3 bg-bg-elevated border border-border-subtle rounded-[12px] px-4 py-3 shadow-xl text-[14px] text-text-primary"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 201}}

          , t.type === 'success' && (
            React.createElement(CheckCircle2, { className: "w-5 h-5 text-status-success shrink-0"   , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 206}} )
          )
          , t.type === 'warning' && (
            React.createElement(AlertTriangle, { className: "w-5 h-5 text-status-warning shrink-0"   , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 209}} )
          )
          , t.type === 'error' && (
            React.createElement(AlertTriangle, { className: "w-5 h-5 text-status-danger shrink-0"   , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 212}} )
          )
          , t.type === 'info' && (
            React.createElement(Info, { className: "w-5 h-5 text-status-info shrink-0"   , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}} )
          )
          , React.createElement('span', { className: "flex-1 leading-snug" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}}, t.message)
          , t.actionLabel && t.onAction && (
            React.createElement('button', {
              onClick: () => {
                _optionalChain([t, 'access', _ => _.onAction, 'optionalCall', _2 => _2()]);
                dismissToast(t.id);
              },
              className: "text-accent-500 font-semibold text-[13px] shrink-0 cursor-pointer"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 219}}

              , t.actionLabel
            )
          )
          , React.createElement('button', {
            onClick: () => dismissToast(t.id),
            className: "text-text-muted hover:text-text-primary cursor-pointer"  ,
            'aria-label': "Tutup notifikasi" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}

            , React.createElement(X, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}} )
          )
        )
      ))
    )
  );
};

export const StarRating



 = ({ value, onChange, size = 18 }) => {
  return (
    React.createElement('div', { className: "inline-flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 248}}
      , [1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value;
        return (
          React.createElement('button', {
            key: star,
            type: "button",
            disabled: !onChange,
            onClick: () => _optionalChain([onChange, 'optionalCall', _3 => _3(star)]),
            className: onChange ? 'cursor-pointer p-1 -m-1' : 'cursor-default',
            'aria-label': `${star} bintang`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 252}}

            , React.createElement(Star, {
              style: { width: size, height: size },
              strokeWidth: 1.75,
              className: 
                filled ? 'fill-accent-200 text-accent-200' : 'text-border-subtle fill-transparent'
              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 260}}
            )
          )
        );
      })
    )
  );
};

export const EmptyState





 = ({ title, description, actionLabel, onAction, icon = 'cat' }) => (
  React.createElement('div', { className: "flex flex-col items-center justify-center text-center py-12 px-6 bg-bg-surface border border-border-subtle rounded-[16px]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}
    , React.createElement('div', { className: "w-16 h-16 rounded-full bg-bg-elevated border border-border-subtle flex items-center justify-center mb-4 text-brown-300"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}
      , icon === 'cat' && (
        React.createElement('svg', { viewBox: "0 0 32 32"   , fill: "none", className: "w-8 h-8" , stroke: "currentColor", strokeWidth: "1.75", __self: this, __source: {fileName: _jsxFileName, lineNumber: 284}}
          , React.createElement('path', { d: "M7 13L9 6L14 10H18L23 6L25 13V18C25 22.97 20.97 27 16 27C11.03 27 7 22.97 7 18V13Z"               , strokeLinejoin: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 285}} )
          , React.createElement('circle', { cx: "12.5", cy: "16", r: "1", fill: "currentColor", __self: this, __source: {fileName: _jsxFileName, lineNumber: 286}} )
          , React.createElement('circle', { cx: "19.5", cy: "16", r: "1", fill: "currentColor", __self: this, __source: {fileName: _jsxFileName, lineNumber: 287}} )
          , React.createElement('path', { d: "M14 20C14.8 20.8 17.2 20.8 18 20"      , strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 288}} )
        )
      )
      , icon === 'cup' && (
        React.createElement('svg', { viewBox: "0 0 32 32"   , fill: "none", className: "w-8 h-8" , stroke: "currentColor", strokeWidth: "1.75", __self: this, __source: {fileName: _jsxFileName, lineNumber: 292}}
          , React.createElement('path', { d: "M6 12H22V19C22 23.4 18.4 27 14 27C9.6 27 6 23.4 6 19V12Z"           , strokeLinejoin: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 293}} )
          , React.createElement('path', { d: "M22 14H24.5C26.4 14 28 15.6 28 17.5C28 19.4 26.4 21 24.5 21H22"           , strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 294}} )
          , React.createElement('path', { d: "M11 6V9M16 5V9"  , strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 295}} )
        )
      )
      , icon === 'search' && (
        React.createElement('svg', { viewBox: "0 0 32 32"   , fill: "none", className: "w-8 h-8" , stroke: "currentColor", strokeWidth: "1.75", __self: this, __source: {fileName: _jsxFileName, lineNumber: 299}}
          , React.createElement('circle', { cx: "14", cy: "14", r: "7", __self: this, __source: {fileName: _jsxFileName, lineNumber: 300}} )
          , React.createElement('path', { d: "M19.5 19.5L26 26"  , strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 301}} )
        )
      )
    )
    , React.createElement('h3', { className: "font-sans font-semibold text-[18px] text-text-primary mb-1.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 305}}, title)
    , description && (
      React.createElement('p', { className: "text-[14px] leading-[22px] text-text-secondary max-w-xs mb-5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 307}}, description)
    )
    , actionLabel && onAction && (
      React.createElement(Button, { variant: "secondary", size: "sm", onClick: onAction, __self: this, __source: {fileName: _jsxFileName, lineNumber: 310}}
        , actionLabel
      )
    )
  )
);

export const SkeletonCard = ({
  ratio = 'square',
}) => {
  const aspect =
    ratio === 'portrait' ? 'aspect-[4/5]' : ratio === 'banner' ? 'aspect-[16/10]' : 'aspect-square';
  return (
    React.createElement('div', { className: "bg-bg-surface border border-border-subtle rounded-[16px] overflow-hidden"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 323}}
      , React.createElement('div', { className: `${aspect} bg-bg-elevated animate-pulse`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 324}} )
      , React.createElement('div', { className: "p-3.5 space-y-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 325}}
        , React.createElement('div', { className: "h-4 w-3/4 bg-bg-elevated rounded animate-pulse"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 326}} )
        , React.createElement('div', { className: "h-3.5 w-1/2 bg-bg-elevated rounded animate-pulse"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 327}} )
      )
    )
  );
};
