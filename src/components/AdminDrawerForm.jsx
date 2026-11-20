const _jsxFileName = "src\\components\\AdminDrawerForm.tsx";import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui';

export const AdminDrawerForm







 = ({
  open,
  onClose,
  title,
  onSubmit,
  submitLabel = 'Simpan',
  disabled = false,
  children,
}) => {
  if (!open) return null;

  return (
    React.createElement('div', { className: "fixed inset-0 z-50 flex justify-end"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}
      , React.createElement('div', {
        className: "fixed inset-0 bg-black/70 backdrop-blur-[2px]"   ,
        onClick: onClose,
        'aria-hidden': "true", __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}}
      )
      , React.createElement('form', {
        onSubmit: onSubmit,
        className: "relative z-10 w-full lg:w-[480px] bg-bg-surface border-l border-border-subtle h-full flex flex-col"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}

        , React.createElement('div', { className: "h-14 lg:h-16 px-5 border-b border-border-subtle flex items-center justify-between shrink-0"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
          , React.createElement('h2', { className: "font-sans font-semibold text-[18px] text-text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}, title)
          , React.createElement('button', {
            type: "button",
            onClick: onClose,
            'aria-label': "Tutup form" ,
            className: "w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-elevated cursor-pointer"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}

            , React.createElement(X, { className: "w-5 h-5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}} )
          )
        )

        , React.createElement('div', { className: "flex-1 overflow-y-auto p-5 space-y-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}, children)

        , React.createElement('div', { className: "p-4 border-t border-border-subtle bg-bg-surface shrink-0 flex gap-3 pb-safe"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
          , React.createElement(Button, { type: "button", variant: "secondary", fullWidth: true, onClick: onClose, __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}, "Batal"

          )
          , React.createElement(Button, { type: "submit", fullWidth: true, disabled: disabled, __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}
            , submitLabel
          )
        )
      )
    )
  );
};
