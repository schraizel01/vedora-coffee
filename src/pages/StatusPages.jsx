const _jsxFileName = "src\\pages\\StatusPages.tsx";import React from 'react';
import { Link } from 'react-router-dom';
import { Button, EmptyState } from '../components/ui';
import { CustomerLayout } from '../components/CustomerLayout';

export const NotFoundPage = () => (
  React.createElement(CustomerLayout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 7}}
    , React.createElement('div', { className: "max-w-md mx-auto px-4 py-16"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8}}
      , React.createElement(EmptyState, {
        icon: "cat",
        title: "Halaman tidak ditemukan"  ,
        description: "Sepertinya kucing kami memindahkan halaman ini ke sudut lain."        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9}}
      )
      , React.createElement('div', { className: "mt-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 14}}
        , React.createElement(Link, { to: "/", __self: this, __source: {fileName: _jsxFileName, lineNumber: 15}}
          , React.createElement(Button, { fullWidth: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 16}}, "Kembali ke Beranda"  )
        )
      )
    )
  )
);

export const ForbiddenPage = () => (
  React.createElement(CustomerLayout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 24}}
    , React.createElement('div', { className: "max-w-md mx-auto px-4 py-16 text-center space-y-5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}
      , React.createElement('div', { className: "bg-bg-surface border border-border-subtle rounded-[16px] p-8 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}}
        , React.createElement('div', { className: "text-[13px] font-semibold uppercase tracking-widest text-status-danger"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}}, "403 · Akses Ditolak"

        )
        , React.createElement('h1', { className: "font-serif font-semibold text-[26px] leading-[34px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}, "Area Khusus Admin"

        )
        , React.createElement('p', { className: "text-[14px] leading-[22px] text-text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}, "Akun Customer tidak memiliki izin untuk membuka halaman pengelolaan kafe."

        )
      )
      , React.createElement(Link, { to: "/", className: "block", __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}
        , React.createElement(Button, { fullWidth: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}, "Kembali ke Beranda"  )
      )
    )
  )
);
