const _jsxFileName = "src\\pages\\customer\\CatDetailPage.tsx";import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCatAge } from '../../utils/format';
import { CustomerLayout } from '../../components/CustomerLayout';
import { DetailAppBar } from '../../components/DetailAppBar';
import { CatCard } from '../../components/CatalogCards';
import { Badge, Button, EmptyState, LazyImage } from '../../components/ui';

export const CatDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { cats, userFavorites, toggleFavoriteCat } = useApp();

  const cat = cats.find((c) => c.slug === slug && c.status !== 'adopted');
  if (!cat) {
    return (
      React.createElement(CustomerLayout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 19}}
        , React.createElement('div', { className: "max-w-md mx-auto px-4 py-16"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 20}}
          , React.createElement(EmptyState, {
            icon: "cat",
            title: "Kucing tidak ditemukan"  ,
            description: "Profil kucing yang kamu cari tidak tersedia."      ,
            actionLabel: "Lihat semua kucing"  ,
            onAction: () => navigate('/kucing'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}}
          )
        )
      )
    );
  }

  const traits = (cat.traits || cat.personality || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const otherCats = cats.filter((c) => c.id !== cat.id && c.status !== 'adopted').slice(0, 4);
  const isFav = userFavorites.catIds.includes(cat.id);

  return (
    React.createElement(CustomerLayout, { hideTopBar: true, hideBottomNav: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
      , React.createElement(DetailAppBar, { title: cat.name, __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}} )

      , React.createElement('div', { className: "pb-28", __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}
        , React.createElement('div', { className: "max-w-[1120px] mx-auto lg:pt-20 lg:px-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}
          , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-12 lg:gap-10"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}
            /* Portrait Image */
            , React.createElement('div', { className: "lg:col-span-5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}
              , React.createElement(LazyImage, {
                src: cat.image,
                alt: cat.name,
                aspectClass: "aspect-[4/5]",
                className: "lg:rounded-[16px] lg:border lg:border-border-subtle"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
              )
            )

            /* Info */
            , React.createElement('div', { className: "lg:col-span-7 px-4 sm:px-6 lg:px-0 pt-5 lg:pt-2 space-y-5"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}
              , React.createElement(Badge, { tone: cat.status === 'active' ? 'success' : 'warning', __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}}
                , cat.status === 'active' ? 'Siap bermain' : 'Sedang istirahat'
              )

              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
                , React.createElement('h1', { className: "font-serif font-semibold text-[33px] leading-[40px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
                  , cat.name
                )
                , React.createElement('p', { className: "text-[15px] text-text-secondary mt-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}
                  , cat.breed, " · "  , cat.gender === 'Jantan' ? '♂ Jantan' : '♀ Betina', " ·" , ' '
                  , formatCatAge(cat.birthDate)
                )
              )

              , traits.length > 0 && (
                React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}
                  , React.createElement('div', { className: "text-[13px] font-medium uppercase tracking-wider text-text-muted"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}, "Sifat"

                  )
                  , React.createElement('div', { className: "flex flex-wrap gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}
                    , traits.map((trait) => (
                      React.createElement('span', {
                        key: trait,
                        className: "px-3.5 py-1.5 rounded-full bg-bg-surface border border-border-subtle text-[13px] text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}

                        , trait
                      )
                    ))
                  )
                )
              )

              , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
                , React.createElement('div', { className: "text-[13px] font-medium uppercase tracking-wider text-text-muted"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}, "Cerita singkat"

                )
                , React.createElement('p', { className: "text-[16px] leading-[26px] text-text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}, cat.description)
              )

              /* Desktop inline CTA */
              , React.createElement('div', { className: "hidden lg:flex items-center gap-3 pt-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
                , React.createElement('button', {
                  type: "button",
                  onClick: () => toggleFavoriteCat(cat.id),
                  'aria-label': "Simpan ke favorit"  ,
                  className: "w-12 h-12 rounded-[12px] border border-brown-300 flex items-center justify-center text-text-primary hover:bg-bg-elevated cursor-pointer shrink-0"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}}

                  , React.createElement(Heart, {
                    className: `w-5 h-5 ${isFav ? 'fill-accent-500 text-accent-500' : ''}`,
                    strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}}
                  )
                )
                , React.createElement(Link, { to: "/reservasi", className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
                  , React.createElement(Button, { fullWidth: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}, "Reservasi untuk Bertemu"  )
                )
              )
            )
          )

          /* Other Cats */
          , otherCats.length > 0 && (
            React.createElement('section', { className: "px-4 sm:px-6 lg:px-0 mt-10 space-y-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
              , React.createElement('h2', { className: "font-serif font-semibold text-[26px] leading-[34px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}, "Kucing lainnya"

              )
              , React.createElement('div', { className: "flex gap-4 overflow-x-auto no-scrollbar pb-1 lg:grid lg:grid-cols-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}
                , otherCats.map((c) => (
                  React.createElement(CatCard, { key: c.id, cat: c, className: "w-[172px] sm:w-[200px] lg:w-auto shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}} )
                ))
              )
            )
          )
        )
      )

      /* Mobile Sticky Bottom Bar */
      , React.createElement('div', { className: "lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-bg-surface/95 backdrop-blur-md border-t border-border-subtle px-4 py-3 pb-safe"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}
        , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}
          , React.createElement('button', {
            type: "button",
            onClick: () => toggleFavoriteCat(cat.id),
            'aria-label': "Simpan ke favorit"  ,
            className: "w-12 h-12 rounded-[12px] border border-brown-300 flex items-center justify-center text-text-primary hover:bg-bg-elevated cursor-pointer shrink-0"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}

            , React.createElement(Heart, {
              className: `w-5 h-5 ${isFav ? 'fill-accent-500 text-accent-500' : ''}`,
              strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}}
            )
          )
          , React.createElement(Link, { to: "/reservasi", className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
            , React.createElement(Button, { fullWidth: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}, "Reservasi untuk Bertemu"  )
          )
        )
      )
    )
  );
};