const _jsxFileName = "src\\pages\\customer\\CatsPage.tsx";import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomerLayout } from '../../components/CustomerLayout';
import { CatCard } from '../../components/CatalogCards';
import { EmptyState } from '../../components/ui';



export const CatsPage = () => {
  const { cats } = useApp();
  const [filter, setFilter] = useState('all');

  const publicCats = useMemo(() => {
    return cats.filter((c) => {
      if (c.status === 'adopted') return false;
      if (filter === 'all') return true;
      return c.status === filter;
    });
  }, [cats, filter]);

  return (
    React.createElement(CustomerLayout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 24}}
      , React.createElement('div', { className: "max-w-[1120px] mx-auto px-4 sm:px-6 pt-5 space-y-6"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}
        , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}}
          , React.createElement('h1', { className: "font-serif font-semibold text-[33px] leading-[40px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}}, "Kenalan dengan Para Kucing"

          )
          , React.createElement('p', { className: "text-[15px] leading-[24px] text-text-secondary max-w-xl"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}, "Setiap kucing di Vedora dirawat rutin dan punya jadwal istirahat agar tetap sehat dan bahagia menemanimu."


          )
        )

        /* Status Chips */
        , React.createElement('div', { className: "flex items-center gap-2 overflow-x-auto no-scrollbar"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}
          , [
            { key: 'all' , label: 'Semua' },
            { key: 'active' , label: 'Siap bermain' },
            { key: 'resting' , label: 'Sedang istirahat' },
          ].map((chip) => (
            React.createElement('button', {
              key: chip.key,
              type: "button",
              onClick: () => setFilter(chip.key),
              className: `h-10 px-4 rounded-full text-[14px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                filter === chip.key
                  ? 'bg-accent-500 text-on-accent font-semibold'
                  : 'bg-bg-surface border border-border-subtle text-text-secondary hover:text-text-primary'
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}

              , chip.label
            )
          ))
        )

        /* Grid 2 cols mobile, 3 tablet, 4 desktop */
        , publicCats.length === 0 ? (
          React.createElement(EmptyState, {
            icon: "cat",
            title: "Belum ada kucing di kategori ini"     ,
            actionLabel: "Lihat semua kucing"  ,
            onAction: () => setFilter('all'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 60}}
          )
        ) : (
          React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}
            , publicCats.map((cat) => (
              React.createElement(CatCard, { key: cat.id, cat: cat, __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}} )
            ))
          )
        )

        /* Bottom link to Cafe Rules */
        , React.createElement('div', { className: "pt-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}
          , React.createElement(Link, {
            to: "/tentang#aturan",
            className: "flex items-center justify-between bg-bg-surface border border-border-subtle rounded-[16px] px-5 py-4 hover:border-brown-300 transition-colors"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}

            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}
              , React.createElement('div', { className: "font-semibold text-[15px] text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}, "Aturan berinteraksi dengan kucing"

              )
              , React.createElement('div', { className: "text-[13px] text-text-secondary mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}, "Baca panduan singkat sebelum bermain di area kucing"

              )
            )
            , React.createElement(ChevronRight, { className: "w-5 h-5 text-accent-500 shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}} )
          )
        )
      )
    )
  );
};
