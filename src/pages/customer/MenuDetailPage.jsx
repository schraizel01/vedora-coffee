const _jsxFileName = "src\\pages\\customer\\MenuDetailPage.tsx";import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatRupiah } from '../../utils/format';
import { CustomerLayout } from '../../components/CustomerLayout';
import { DetailAppBar } from '../../components/DetailAppBar';
import { MenuCard } from '../../components/CatalogCards';
import { Badge, Button, EmptyState, LazyImage } from '../../components/ui';

export const MenuDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { menuItems, categories, userFavorites, toggleFavoriteMenu } = useApp();

  const item = menuItems.find((m) => m.slug === slug);
  if (!item) {
    return (
      React.createElement(CustomerLayout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 19}}
        , React.createElement('div', { className: "max-w-md mx-auto px-4 py-16"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 20}}
          , React.createElement(EmptyState, {
            icon: "cup",
            title: "Menu tidak ditemukan"  ,
            description: "Menu yang kamu cari mungkin sudah dihapus atau alamatnya berubah."         ,
            actionLabel: "Lihat semua menu"  ,
            onAction: () => navigate('/menu'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}}
          )
        )
      )
    );
  }

  const category = categories.find((c) => c.id === item.categoryId);
  const related = menuItems
    .filter((m) => m.categoryId === item.categoryId && m.id !== item.id)
    .slice(0, 4);
  const isFav = userFavorites.menuIds.includes(item.id);

  return (
    React.createElement(CustomerLayout, { hideTopBar: true, hideBottomNav: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}
      , React.createElement(DetailAppBar, { title: item.name, __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}} )

      , React.createElement('div', { className: "pb-28", __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}
        , React.createElement('div', { className: "max-w-[1120px] mx-auto lg:pt-20 lg:px-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}
          , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-12 lg:gap-10"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}
            /* 16:10 Hero Image */
            , React.createElement('div', { className: "lg:col-span-7", __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}
              , React.createElement(LazyImage, {
                src: item.image,
                alt: item.name,
                aspectClass: "aspect-[16/10]",
                className: "lg:rounded-[16px] lg:border lg:border-border-subtle"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}
              )
            )

            /* Info */
            , React.createElement('div', { className: "lg:col-span-5 px-4 sm:px-6 lg:px-0 pt-5 lg:pt-2 space-y-5"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}
              , React.createElement('div', { className: "flex flex-wrap items-center gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}
                , item.badge !== 'none' && (
                  React.createElement(Badge, { tone: item.badge === 'Best Seller' ? 'accent' : 'info', __self: this, __source: {fileName: _jsxFileName, lineNumber: 60}}
                    , item.badge
                  )
                )
                , React.createElement(Badge, { tone: item.isAvailable ? 'success' : 'neutral', __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
                  , item.isAvailable ? 'Tersedia' : 'Habis'
                )
              )

              , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}
                , React.createElement('h1', { className: "font-serif font-semibold text-[33px] leading-[40px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}}
                  , item.name
                )
                , React.createElement('div', { className: "font-sans font-semibold text-[26px] leading-[34px] text-accent-500"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}
                  , formatRupiah(item.price)
                )
              )

              , React.createElement('p', { className: "text-[16px] leading-[26px] text-text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}, item.description)

              , category && (
                React.createElement('div', { className: "pt-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
                  , React.createElement(Link, {
                    to: `/menu?kategori=${category.id}`,
                    className: "inline-flex items-center h-9 px-4 rounded-full bg-bg-surface border border-border-subtle text-[13px] font-medium text-text-secondary hover:text-text-primary hover:border-brown-300"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}}
, "Kategori: "
                     , category.name
                  )
                )
              )

              /* Desktop inline CTA */
              , React.createElement('div', { className: "hidden lg:flex items-center gap-3 pt-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
                , React.createElement('button', {
                  type: "button",
                  onClick: () => toggleFavoriteMenu(item.id),
                  'aria-label': "Simpan ke favorit"  ,
                  className: "w-12 h-12 rounded-[12px] border border-brown-300 flex items-center justify-center text-text-primary hover:bg-bg-elevated cursor-pointer shrink-0"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}

                  , React.createElement(Heart, {
                    className: `w-5 h-5 ${isFav ? 'fill-accent-500 text-accent-500' : ''}`,
                    strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
                  )
                )
                , React.createElement(Link, { to: "/reservasi", className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
                  , React.createElement(Button, { fullWidth: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}, "Reservasi Meja" )
                )
              )
            )
          )

          /* Related Carousel */
          , related.length > 0 && (
            React.createElement('section', { className: "px-4 sm:px-6 lg:px-0 mt-10 space-y-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}}
              , React.createElement('h2', { className: "font-serif font-semibold text-[26px] leading-[34px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}, "Menu lain di kategori ini"

              )
              , React.createElement('div', { className: "flex gap-4 overflow-x-auto no-scrollbar pb-1 lg:grid lg:grid-cols-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}}
                , related.map((m) => (
                  React.createElement(MenuCard, { key: m.id, item: m, className: "w-[168px] sm:w-[200px] lg:w-auto shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}} )
                ))
              )
            )
          )
        )
      )

      /* Mobile Sticky Bottom Bar */
      , React.createElement('div', { className: "lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-bg-surface/95 backdrop-blur-md border-t border-border-subtle px-4 py-3 pb-safe"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}
        , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
          , React.createElement('button', {
            type: "button",
            onClick: () => toggleFavoriteMenu(item.id),
            'aria-label': "Simpan ke favorit"  ,
            className: "w-12 h-12 rounded-[12px] border border-brown-300 flex items-center justify-center text-text-primary hover:bg-bg-elevated cursor-pointer shrink-0"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}

            , React.createElement(Heart, {
              className: `w-5 h-5 ${isFav ? 'fill-accent-500 text-accent-500' : ''}`,
              strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}
            )
          )
          , React.createElement(Link, { to: "/reservasi", className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}
            , React.createElement(Button, { fullWidth: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}, "Reservasi Meja" )
          )
        )
      )
    )
  );
};
