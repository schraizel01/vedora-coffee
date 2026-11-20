const _jsxFileName = "src\\pages\\customer\\PromoPage.tsx";import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getPromoTimeState } from '../../utils/format';
import { CustomerLayout } from '../../components/CustomerLayout';
import { PromoCard } from '../../components/CatalogCards';
import { EmptyState } from '../../components/ui';



export const PromoPage = () => {
  const { promos } = useApp();
  const [segment, setSegment] = useState('Semua');

  const visiblePromos = useMemo(() => {
    return promos
      .filter((p) => {
        if (!p.isPublished) return false;
        const state = getPromoTimeState(p.startDate, p.endDate);
        if (state === 'ended') return false;
        if (segment !== 'Semua' && p.type !== segment) return false;
        return true;
      })
      .sort((a, b) => {
        const sa = getPromoTimeState(a.startDate, a.endDate) === 'ongoing' ? 0 : 1;
        const sb = getPromoTimeState(b.startDate, b.endDate) === 'ongoing' ? 0 : 1;
        return sa - sb;
      });
  }, [promos, segment]);

  return (
    React.createElement(CustomerLayout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}
      , React.createElement('div', { className: "max-w-[1120px] mx-auto px-4 sm:px-6 pt-5 space-y-6"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
        , React.createElement('h1', { className: "font-serif font-semibold text-[33px] leading-[40px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}, "Promo & Event"

        )

        /* Segmented Control */
        , React.createElement('div', { className: "inline-flex p-1 rounded-[12px] bg-bg-surface border border-border-subtle"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}
          , (['Semua', 'Promo', 'Event'] ).map((tab) => (
            React.createElement('button', {
              key: tab,
              type: "button",
              onClick: () => setSegment(tab),
              className: `h-10 px-5 rounded-[10px] text-[14px] font-semibold transition-colors cursor-pointer ${
                segment === tab
                  ? 'bg-accent-500 text-on-accent'
                  : 'text-text-secondary hover:text-text-primary'
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}

              , tab
            )
          ))
        )

        , visiblePromos.length === 0 ? (
          React.createElement(EmptyState, {
            icon: "cup",
            title: "Belum ada promo saat ini, pantau terus ya"       ,
            description: "Nantikan penawaran kopi dan agenda seru bersama kucing Vedora berikutnya."         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}
          )
        ) : (
          React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}
            , visiblePromos.map((promo) => (
              React.createElement(PromoCard, { key: promo.id, promo: promo, __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}} )
            ))
          )
        )
      )
    )
  );
};
