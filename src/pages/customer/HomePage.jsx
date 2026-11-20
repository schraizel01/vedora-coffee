const _jsxFileName = "src\\pages\\customer\\HomePage.tsx";import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ChevronRight, Download, X, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getCafeOpenStatus, getPromoTimeState } from '../../utils/format';
import { CustomerLayout } from '../../components/CustomerLayout';
import { CatCard, MenuCard, PromoCard } from '../../components/CatalogCards';
import { Button, StarRating } from '../../components/ui';

export const HomePage = () => {
  const {
    cafeInfo,
    menuItems,
    cats,
    promos,
    reviews,
    installBannerDismissed,
    dismissInstallBanner,
    showToast,
  } = useApp();

  const openStatus = getCafeOpenStatus(cafeInfo);

  const featuredMenu = menuItems
    .filter((m) => m.isFeatured && m.isAvailable)
    .slice(0, 6);

  const featuredCats = cats
    .filter((c) => c.status !== 'adopted' && c.isFeatured)
    .slice(0, 6);

  const activePromos = promos
    .filter((p) => {
      if (!p.isPublished) return false;
      const state = getPromoTimeState(p.startDate, p.endDate);
      return state === 'ongoing' || state === 'upcoming';
    })
    .sort((a, b) => {
      const sa = getPromoTimeState(a.startDate, a.endDate) === 'ongoing' ? 0 : 1;
      const sb = getPromoTimeState(b.startDate, b.endDate) === 'ongoing' ? 0 : 1;
      return sa - sb;
    })
    .slice(0, 3);

  const approvedReviews = reviews.filter((r) => r.status === 'approved').slice(0, 5);
  const avgRating =
    approvedReviews.length > 0
      ? (approvedReviews.reduce((s, r) => s + r.rating, 0) / approvedReviews.length).toFixed(1)
      : '0.0';

  return (
    React.createElement(CustomerLayout, { transparentTopBar: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}
      /* 1. Hero Full Width (~62% viewport height) */
      , React.createElement('section', { className: "relative h-[62vh] min-h-[480px] max-h-[620px] w-full overflow-hidden"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
        , React.createElement('img', {
          src: cafeInfo.heroImage,
          alt: "Suasana malam hangat di Vedora Coffee"     ,
          className: "absolute inset-0 w-full h-full object-cover"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}
        )
        , React.createElement('div', { className: "absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/65 to-bg-base/35"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 60}} )
        , React.createElement('div', { className: "relative z-10 h-full max-w-[1120px] mx-auto px-4 sm:px-6 flex flex-col justify-end pb-8 sm:pb-12"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}
          , React.createElement('p', { className: "text-[13px] uppercase tracking-[0.18em] text-accent-200 font-medium mb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}
            , cafeInfo.name
          )
          , React.createElement('h1', { className: "font-serif font-semibold text-[33px] leading-[40px] lg:text-[42px] lg:leading-[50px] text-text-primary max-w-xl"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}, "Cat, Coffee & Eatery"

          )
          , React.createElement('p', { className: "text-[16px] leading-[26px] text-text-secondary max-w-md mt-2.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}, "Ruang tenang untuk menikmati seduhan kopi pilihan bersama kucing-kucing terawat di Kemang."

          )
          , React.createElement('div', { className: "flex flex-col sm:flex-row gap-3 mt-6 sm:max-w-md"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 71}}
            , React.createElement(Link, { to: "/reservasi", className: "sm:flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}}
              , React.createElement(Button, { fullWidth: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}, "Reservasi Meja" )
            )
            , React.createElement(Link, { to: "/menu", className: "sm:flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}
              , React.createElement(Button, { variant: "secondary", fullWidth: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}, "Lihat Menu"

              )
            )
          )
        )
      )

      , React.createElement('div', { className: "max-w-[1120px] mx-auto px-4 sm:px-6 space-y-10 mt-6"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}
        /* Dismissible Install PWA Banner */
        , !installBannerDismissed && (
          React.createElement('div', { className: "flex items-center justify-between gap-3 bg-bg-surface border border-border-subtle rounded-[16px] px-4 py-3"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}
            , React.createElement('div', { className: "flex items-center gap-3 min-w-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
              , React.createElement('div', { className: "w-10 h-10 rounded-[12px] bg-accent-500/16 text-accent-500 flex items-center justify-center shrink-0"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
                , React.createElement(Download, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}} )
              )
              , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
                , React.createElement('div', { className: "text-[14px] font-semibold text-text-primary truncate"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}, "Pasang Vedora Coffee"

                )
                , React.createElement('div', { className: "text-[13px] text-text-secondary truncate"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}, "Akses cepat katalog & reservasi kapan saja"

                )
              )
            )
            , React.createElement('div', { className: "flex items-center gap-1 shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}
              , React.createElement('button', {
                type: "button",
                onClick: () =>
                  showToast(
                    'Buka menu browser → Tambahkan ke Layar Utama untuk memasang PWA',
                    'info'
                  )
                ,
                className: "px-3 h-9 rounded-[10px] bg-accent-500/16 text-accent-500 text-[13px] font-semibold cursor-pointer"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
, "Instal"

              )
              , React.createElement('button', {
                type: "button",
                onClick: dismissInstallBanner,
                'aria-label': "Tutup ajakan instal"  ,
                className: "w-9 h-9 flex items-center justify-center text-text-muted hover:text-text-primary cursor-pointer"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}

                , React.createElement(X, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}} )
              )
            )
          )
        )

        /* 2. Quick Info Strip */
        , React.createElement('section', { className: "bg-bg-surface border border-border-subtle rounded-[16px] px-4 py-3.5 flex flex-wrap items-center justify-between gap-3"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}
          , React.createElement('div', { className: "flex items-center gap-2.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}
            , React.createElement(Clock, {
              className: `w-5 h-5 shrink-0 ${
                openStatus.isOpen ? 'text-status-success' : 'text-status-warning'
              }`,
              strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
            )
            , React.createElement('span', { className: "text-[14px] font-medium text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}, openStatus.label)
          )
          , React.createElement(Link, {
            to: "/tentang#lokasi",
            className: "inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent-500 hover:text-accent-200"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}

            , React.createElement(MapPin, { className: "w-4 h-4" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}} ), "Lihat lokasi"

          )
        )

        /* 3. Menu Unggulan */
        , featuredMenu.length > 0 && (
          React.createElement('section', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
            , React.createElement('div', { className: "flex items-end justify-between gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}
              , React.createElement('h2', { className: "font-serif font-semibold text-[26px] leading-[34px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 150}}, "Menu Unggulan"

              )
              , React.createElement(Link, {
                to: "/menu",
                className: "inline-flex items-center gap-1 text-[14px] font-semibold text-accent-500 hover:text-accent-200 shrink-0"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}
, "Lihat semua"

                , React.createElement(ChevronRight, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}} )
              )
            )
            , React.createElement('div', { className: "flex gap-4 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}}
              , featuredMenu.map((item) => (
                React.createElement(MenuCard, {
                  key: item.id,
                  item: item,
                  className: "w-[168px] sm:w-[200px] lg:w-auto shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}
                )
              ))
            )
          )
        )

        /* 4. Kenalan dengan Kucing */
        , featuredCats.length > 0 && (
          React.createElement('section', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 175}}
            , React.createElement('div', { className: "flex items-end justify-between gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 176}}
              , React.createElement('h2', { className: "font-serif font-semibold text-[26px] leading-[34px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}, "Kenalan dengan Kucing"

              )
              , React.createElement(Link, {
                to: "/kucing",
                className: "inline-flex items-center gap-1 text-[14px] font-semibold text-accent-500 hover:text-accent-200 shrink-0"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}
, "Lihat semua"

                , React.createElement(ChevronRight, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}} )
              )
            )
            , React.createElement('div', { className: "flex gap-4 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}
              , featuredCats.map((cat) => (
                React.createElement(CatCard, {
                  key: cat.id,
                  cat: cat,
                  className: "w-[172px] sm:w-[210px] lg:w-auto shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}
                )
              ))
            )
          )
        )

        /* 5. Promo & Event */
        , activePromos.length > 0 && (
          React.createElement('section', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}}
            , React.createElement('div', { className: "flex items-end justify-between gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}
              , React.createElement('h2', { className: "font-serif font-semibold text-[26px] leading-[34px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 204}}, "Promo & Event"

              )
              , React.createElement(Link, {
                to: "/promo",
                className: "inline-flex items-center gap-1 text-[14px] font-semibold text-accent-500 hover:text-accent-200 shrink-0"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}}
, "Lihat semua"

                , React.createElement(ChevronRight, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 212}} )
              )
            )
            , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}}
              , activePromos.map((promo) => (
                React.createElement(PromoCard, { key: promo.id, promo: promo, __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}} )
              ))
            )
          )
        )

        /* 6. Kata Pelanggan */
        , approvedReviews.length > 0 && (
          React.createElement('section', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 225}}
            , React.createElement('div', { className: "flex flex-wrap items-center justify-between gap-3"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 227}}
                , React.createElement('h2', { className: "font-serif font-semibold text-[26px] leading-[34px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 228}}, "Kata Pelanggan"

                )
                , React.createElement('div', { className: "flex items-center gap-2 mt-1 text-[14px] text-text-secondary"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}
                  , React.createElement(Star, { className: "w-4 h-4 fill-accent-200 text-accent-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 232}} )
                  , React.createElement('span', { className: "font-semibold text-text-primary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}}, avgRating)
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}, "· " , approvedReviews.length, " ulasan terverifikasi"  )
                )
              )
              , React.createElement(Link, {
                to: "/akun?tab=ulasan",
                className: "text-[14px] font-semibold text-accent-500 hover:text-accent-200"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 237}}
, "Tulis ulasan"

              )
            )
            , React.createElement('div', { className: "flex gap-4 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 244}}
              , approvedReviews.map((rev) => (
                React.createElement('div', {
                  key: rev.id,
                  className: "w-[290px] sm:w-[320px] lg:w-auto shrink-0 bg-bg-surface border border-border-subtle rounded-[16px] p-5 flex flex-col justify-between gap-3"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}

                  , React.createElement('div', { className: "space-y-2.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 250}}
                    , React.createElement(StarRating, { value: rev.rating, size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 251}} )
                    , React.createElement('p', { className: "text-[14px] leading-[22px] text-text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 252}}, "“"
                      , rev.comment, "”"
                    )
                  )
                  , React.createElement('div', { className: "text-[13px] font-semibold text-text-primary pt-2 border-t border-border-subtle/60"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 256}}
                    , rev.authorName
                  )
                )
              ))
            )
          )
        )

        /* 7. Closing CTA */
        , React.createElement('section', { className: "bg-bg-surface border border-border-subtle rounded-[16px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 266}}
          , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}
            , React.createElement('h2', { className: "font-serif font-semibold text-[26px] leading-[34px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}}, "Siap berkunjung?"

            )
            , React.createElement('p', { className: "text-[14px] leading-[22px] text-text-secondary max-w-md"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 271}}
              , cafeInfo.address, ". Amankan kursimu lebih awal agar waktu bermain bersama kucing tetap nyaman."

            )
          )
          , React.createElement(Link, { to: "/reservasi", className: "shrink-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 276}}
            , React.createElement(Button, { className: "w-full md:w-auto px-7"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 277}}, "Reservasi Meja" )
          )
        )
      )
    )
  );
};
