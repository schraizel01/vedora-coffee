const _jsxFileName = "src\\pages\\customer\\PromoDetailPage.tsx";import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDateFull, getPromoTimeState, getRemainingDaysText } from '../../utils/format';
import { CustomerLayout } from '../../components/CustomerLayout';
import { DetailAppBar } from '../../components/DetailAppBar';
import { Badge, Button, EmptyState, LazyImage } from '../../components/ui';

export const PromoDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { promos } = useApp();

  const promo = promos.find((p) => p.slug === slug && p.isPublished);
  if (!promo) {
    return (
      React.createElement(CustomerLayout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 18}}
        , React.createElement('div', { className: "max-w-md mx-auto px-4 py-16"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 19}}
          , React.createElement(EmptyState, {
            icon: "cup",
            title: "Promo tidak ditemukan"  ,
            description: "Promo atau event yang kamu cari belum terbit atau sudah dihapus."          ,
            actionLabel: "Lihat promo lainnya"  ,
            onAction: () => navigate('/promo'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 20}}
          )
        )
      )
    );
  }

  const timeState = getPromoTimeState(promo.startDate, promo.endDate);
  const remainingText = getRemainingDaysText(promo.startDate, promo.endDate);
  const paragraphs = promo.description.split('\n').filter((line) => line.trim() !== '');

  return (
    React.createElement(CustomerLayout, { hideTopBar: true, hideBottomNav: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}
      , React.createElement(DetailAppBar, { title: promo.title, __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}} )

      , React.createElement('div', { className: "pb-28", __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}
        , React.createElement('div', { className: "max-w-[820px] mx-auto lg:pt-20 lg:px-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
          , React.createElement(LazyImage, {
            src: promo.image,
            alt: promo.title,
            aspectClass: "aspect-[16/10]",
            className: "lg:rounded-[16px] lg:border lg:border-border-subtle"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}
          )

          , React.createElement('div', { className: "px-4 sm:px-6 lg:px-0 pt-5 space-y-5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
            , React.createElement('div', { className: "flex flex-wrap items-center gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}
              , React.createElement(Badge, { tone: promo.type === 'Promo' ? 'accent' : 'info', __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, promo.type)
              , timeState === 'ongoing' && React.createElement(Badge, { tone: "success", __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}, "Berlangsung")
              , timeState === 'upcoming' && React.createElement(Badge, { tone: "info", __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}, "Segera")
              , timeState === 'ended' && React.createElement(Badge, { tone: "neutral", __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}, "Berakhir")
            )

            , React.createElement('h1', { className: "font-serif font-semibold text-[30px] sm:text-[33px] leading-[38px] sm:leading-[40px] text-text-primary"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}
              , promo.title
            )

            , React.createElement('div', { className: "p-4 rounded-[12px] bg-bg-surface border border-border-subtle flex items-start gap-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}
              , React.createElement(Calendar, { className: "w-5 h-5 text-accent-500 shrink-0 mt-0.5"    , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}} )
              , React.createElement('div', { className: "text-[14px] leading-[22px]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
                , React.createElement('div', { className: "text-text-primary font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
                  , formatDateFull(promo.startDate), " – "  , formatDateFull(promo.endDate)
                )
                , React.createElement('div', { className: "text-accent-200 font-medium mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}, remainingText)
              )
            )

            , React.createElement('div', { className: "space-y-3 text-[16px] leading-[26px] text-text-secondary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 71}}
              , paragraphs.map((line, i) => {
                if (line.startsWith('- ')) {
                  return (
                    React.createElement('div', { key: i, className: "flex items-start gap-2.5 pl-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}
                      , React.createElement('span', { className: "w-1.5 h-1.5 rounded-full bg-accent-500 mt-2.5 shrink-0"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}} )
                      , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}, line.slice(2))
                    )
                  );
                }
                return (
                  React.createElement('p', {
                    key: i,
                    className: 
                      line.toLowerCase().includes('syarat dan ketentuan')
                        ? 'font-semibold text-text-primary pt-2'
                        : ''
                    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}}

                    , line
                  )
                );
              })
            )

            , React.createElement('div', { className: "hidden lg:block pt-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}
              , React.createElement(Link, { to: "/reservasi", __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}
                , React.createElement(Button, { className: "px-8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}, "Reservasi Sekarang" )
              )
            )
          )
        )
      )

      /* Mobile Sticky Bottom Bar */
      , React.createElement('div', { className: "lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-bg-surface/95 backdrop-blur-md border-t border-border-subtle px-4 py-3 pb-safe"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
        , React.createElement(Link, { to: "/reservasi", className: "block", __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
          , React.createElement(Button, { fullWidth: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}, "Reservasi Sekarang" )
        )
      )
    )
  );
};
