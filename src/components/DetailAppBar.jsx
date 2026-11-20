const _jsxFileName = "src\\components\\DetailAppBar.tsx";import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DetailAppBar = ({ title }) => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 140);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${title} — Vedora Coffee`, url });
        return;
      } catch (e) {
        // user cancelled or fallback
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast('Tautan disalin ke papan klip', 'success');
    } catch (e2) {
      showToast('Salin tautan dari bilah alamat browser', 'info');
    }
  };

  return (
    React.createElement('header', {
      className: `fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-bg-surface/95 backdrop-blur-md border-b border-border-subtle'
          : 'bg-gradient-to-b from-bg-base/75 to-transparent'
      }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}

      , React.createElement('div', { className: "max-w-[1120px] mx-auto h-14 lg:h-16 px-4 lg:px-6 flex items-center justify-between gap-3"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}
        , React.createElement('button', {
          type: "button",
          onClick: () => navigate(-1),
          'aria-label': "Kembali",
          className: "w-11 h-11 rounded-full bg-bg-base/60 backdrop-blur-sm border border-border-subtle/60 flex items-center justify-center text-text-primary hover:bg-bg-elevated cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}

          , React.createElement(ArrowLeft, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}} )
        )

        , React.createElement('span', {
          className: `font-sans font-semibold text-[16px] text-text-primary truncate transition-opacity duration-200 ${
            scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}

          , title
        )

        , React.createElement('button', {
          type: "button",
          onClick: handleShare,
          'aria-label': "Bagikan",
          className: "w-11 h-11 rounded-full bg-bg-base/60 backdrop-blur-sm border border-border-subtle/60 flex items-center justify-center text-text-primary hover:bg-bg-elevated cursor-pointer"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}

          , React.createElement(Share2, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}} )
        )
      )
    )
  );
};
