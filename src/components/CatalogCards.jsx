const _jsxFileName = "src\\components\\CatalogCards.tsx";import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

import { useApp } from '../context/AppContext';
import { formatCatAge, formatDateShort, formatRupiah, getPromoTimeState } from '../utils/format';
import { Badge, LazyImage } from './ui';

export const MenuCard = ({
  item,
  className = '',
}) => {
  const { userFavorites, toggleFavoriteMenu } = useApp();
  const isFav = userFavorites.menuIds.includes(item.id);

  return (
    React.createElement('div', {
      className: `group relative bg-bg-surface border border-border-subtle rounded-[16px] overflow-hidden flex flex-col transition-colors hover:border-brown-500 ${
        !item.isAvailable ? 'opacity-65' : ''
      } ${className}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 17}}

      , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 22}}
        , React.createElement(Link, { to: `/menu/${item.slug}`, className: "block", __self: this, __source: {fileName: _jsxFileName, lineNumber: 23}}
          , React.createElement(LazyImage, {
            src: item.image,
            alt: item.name,
            aspectClass: "aspect-square",
            imgClassName: !item.isAvailable ? 'grayscale-[40%]' : '', __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}}
          )
        )
        , !item.isAvailable && (
          React.createElement('div', { className: "absolute inset-0 bg-bg-base/55 flex items-center justify-center pointer-events-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
            , React.createElement('span', { className: "px-3 py-1 rounded-full bg-bg-elevated/95 border border-border-subtle text-text-secondary text-[13px] font-medium"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}, "Habis"

            )
          )
        )
        , item.badge !== 'none' && (
          React.createElement('div', { className: "absolute top-2.5 left-2.5 pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}
            , React.createElement(Badge, { tone: item.badge === 'Best Seller' ? 'accent' : 'info', __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}, item.badge)
          )
        )
        , React.createElement('button', {
          type: "button",
          onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavoriteMenu(item.id);
          },
          'aria-label': isFav ? `Hapus ${item.name} dari favorit` : `Simpan ${item.name} ke favorit`,
          className: "absolute top-2 right-2 w-10 h-10 rounded-full bg-bg-base/70 backdrop-blur-sm flex items-center justify-center text-text-primary hover:bg-bg-base/90 cursor-pointer"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}

          , React.createElement(Heart, {
            className: `w-5 h-5 transition-colors ${
              isFav ? 'fill-accent-500 text-accent-500' : 'text-text-primary'
            }`,
            strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}
          )
        )
      )
      , React.createElement(Link, { to: `/menu/${item.slug}`, className: "p-3.5 flex-1 flex flex-col justify-between gap-1.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}
        , React.createElement('h3', { className: "font-sans font-semibold text-[15px] leading-[21px] text-text-primary line-clamp-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}
          , item.name
        )
        , React.createElement('div', { className: "text-accent-500 font-semibold text-[15px] leading-[20px]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
          , formatRupiah(item.price)
        )
      )
    )
  );
};

export const CatCard = ({
  cat,
  className = '',
}) => {
  const { userFavorites, toggleFavoriteCat } = useApp();
  const isFav = userFavorites.catIds.includes(cat.id);

  return (
    React.createElement('div', {
      className: `group relative bg-bg-surface border border-border-subtle rounded-[16px] overflow-hidden flex flex-col transition-colors hover:border-brown-500 ${className}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}

      , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}
        , React.createElement(Link, { to: `/kucing/${cat.slug}`, className: "block", __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}
          , React.createElement(LazyImage, { src: cat.image, alt: cat.name, aspectClass: "aspect-[4/5]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}} )
        )
        , React.createElement('div', { className: "absolute top-2.5 left-2.5 pointer-events-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
          , React.createElement(Badge, { tone: cat.status === 'active' ? 'success' : 'warning', __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
            , cat.status === 'active' ? 'Siap bermain' : 'Sedang istirahat'
          )
        )
        , React.createElement('button', {
          type: "button",
          onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavoriteCat(cat.id);
          },
          'aria-label': isFav ? `Hapus ${cat.name} dari favorit` : `Simpan ${cat.name} ke favorit`,
          className: "absolute top-2 right-2 w-10 h-10 rounded-full bg-bg-base/70 backdrop-blur-sm flex items-center justify-center text-text-primary hover:bg-bg-base/90 cursor-pointer"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}

          , React.createElement(Heart, {
            className: `w-5 h-5 transition-colors ${
              isFav ? 'fill-accent-500 text-accent-500' : 'text-text-primary'
            }`,
            strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}
          )
        )
      )
      , React.createElement(Link, { to: `/kucing/${cat.slug}`, className: "p-3.5 flex flex-col gap-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
        , React.createElement('h3', { className: "font-serif font-semibold text-[20px] leading-[26px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}
          , cat.name
        )
        , React.createElement('p', { className: "text-[13px] leading-[18px] text-text-secondary truncate"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}
          , cat.breed, " · "  , formatCatAge(cat.birthDate)
        )
      )
    )
  );
};

export const PromoCard = ({
  promo,
  className = '',
}) => {
  const timeState = getPromoTimeState(promo.startDate, promo.endDate);
  return (
    React.createElement(Link, {
      to: `/promo/${promo.slug}`,
      className: `group bg-bg-surface border border-border-subtle rounded-[16px] overflow-hidden flex flex-col transition-colors hover:border-brown-500 ${className}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}

      , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}
        , React.createElement(LazyImage, { src: promo.image, alt: promo.title, aspectClass: "aspect-[16/10]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}} )
        , React.createElement('div', { className: "absolute top-3 left-3 flex items-center gap-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}
          , React.createElement(Badge, { tone: promo.type === 'Promo' ? 'accent' : 'info', __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}, promo.type)
          , timeState === 'upcoming' && React.createElement(Badge, { tone: "info", __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}, "Segera")
          , timeState === 'ongoing' && React.createElement(Badge, { tone: "success", __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}, "Berlangsung")
        )
      )
      , React.createElement('div', { className: "p-4 flex-1 flex flex-col justify-between gap-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}
        , React.createElement('h3', { className: "font-sans font-semibold text-[18px] leading-[24px] text-text-primary line-clamp-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}
          , promo.title
        )
        , React.createElement('p', { className: "text-[13px] leading-[18px] text-text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}}
          , timeState === 'upcoming'
            ? `Mulai ${formatDateShort(promo.startDate)}`
            : `Berlaku sampai ${formatDateShort(promo.endDate)}`
        )
      )
    )
  );
};
