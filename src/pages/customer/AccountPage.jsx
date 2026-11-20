const _jsxFileName = "src\\pages\\customer\\AccountPage.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useMemo, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { LogOut, Calendar, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

import { formatDateFull, formatTimeDot, getTodayISO } from '../../utils/format';
import { CustomerLayout } from '../../components/CustomerLayout';
import { CatCard, MenuCard } from '../../components/CatalogCards';
import {
  Badge,

  BottomSheet,
  Button,
  ConfirmDialog,
  EmptyState,
  StarRating,
} from '../../components/ui';



const RES_STATUS_MAP = {
  pending: { label: 'Menunggu konfirmasi', tone: 'warning' },
  confirmed: { label: 'Dikonfirmasi', tone: 'success' },
  completed: { label: 'Selesai', tone: 'neutral' },
  cancelled: { label: 'Dibatalkan', tone: 'danger' },
};

export const AccountPage = () => {
  const {
    currentUser,
    reservations,
    menuItems,
    cats,
    userFavorites,
    reviews,
    isOnline,
    cancelMyReservation,
    submitReview,
    updateProfile,
    logout,
  } = useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') ) || 'reservasi';

  const [tab, setTab] = useState(initialTab);
  const [resSubTab, setResSubTab] = useState('upcoming');
  const [selectedRes, setSelectedRes] = useState(null);
  const [cancelTargetId, setCancelTargetId] = useState(null);
  const [favType, setFavType] = useState('menu');

  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Profile form state
  const [profileName, setProfileName] = useState(_optionalChain([currentUser, 'optionalAccess', _ => _.name]) || '');
  const [profilePhone, setProfilePhone] = useState(_optionalChain([currentUser, 'optionalAccess', _2 => _2.phone]) || '');
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  if (!currentUser) {
    return React.createElement(Navigate, { to: "/masuk", replace: true, state: { from: '/akun' }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}} );
  }

  const today = getTodayISO();
  const myReservations = useMemo(
    () => reservations.filter((r) => r.userId === currentUser.id),
    [reservations, currentUser.id]
  );

  const upcomingRes = myReservations.filter(
    (r) => (r.status === 'pending' || r.status === 'confirmed') && r.date >= today
  );
  const historyRes = myReservations.filter((r) => !upcomingRes.includes(r));
  const shownReservations = resSubTab === 'upcoming' ? upcomingRes : historyRes;

  const favMenus = menuItems.filter((m) => userFavorites.menuIds.includes(m.id));
  const favCats = cats.filter((c) => userFavorites.catIds.includes(c.id) && c.status !== 'adopted');
  const myReview = reviews.find((r) => r.userId === currentUser.id);

  const handleTabChange = (next) => {
    setTab(next);
    setSearchParams({ tab: next });
  };

  return (
    React.createElement(CustomerLayout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}
      , React.createElement('div', { className: "max-w-3xl mx-auto px-4 sm:px-6 pt-5 space-y-6"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
        /* Profile Header */
        , React.createElement('div', { className: "bg-bg-surface border border-border-subtle rounded-[16px] p-5 flex items-center gap-4"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
          , React.createElement('div', { className: "w-14 h-14 rounded-full bg-accent-500/20 text-accent-500 font-serif font-semibold text-[22px] flex items-center justify-center shrink-0"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
            , currentUser.name.charAt(0).toUpperCase()
          )
          , React.createElement('div', { className: "min-w-0 flex-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}
            , React.createElement('h1', { className: "font-serif font-semibold text-[22px] leading-[28px] text-text-primary truncate"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}
              , currentUser.name
            )
            , React.createElement('p', { className: "text-[14px] text-text-secondary truncate"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}, currentUser.email)
          )
        )

        /* Segmented Tabs */
        , React.createElement('div', { className: "grid grid-cols-4 p-1 rounded-[12px] bg-bg-surface border border-border-subtle gap-1"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}
          , [
            { key: 'reservasi' , label: 'Reservasi' },
            { key: 'favorit' , label: 'Favorit' },
            { key: 'ulasan' , label: 'Ulasan' },
            { key: 'profil' , label: 'Profil' },
          ].map((t) => (
            React.createElement('button', {
              key: t.key,
              type: "button",
              onClick: () => handleTabChange(t.key),
              className: `h-10 rounded-[10px] text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer ${
                tab === t.key
                  ? 'bg-accent-500 text-on-accent'
                  : 'text-text-secondary hover:text-text-primary'
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}

              , t.label
            )
          ))
        )

        /* TAB 1: RESERVASI */
        , tab === 'reservasi' && (
          React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}
            , React.createElement('div', { className: "flex gap-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}}
              , React.createElement('button', {
                type: "button",
                onClick: () => setResSubTab('upcoming'),
                className: `h-9 px-4 rounded-full text-[13px] font-semibold cursor-pointer ${
                  resSubTab === 'upcoming'
                    ? 'bg-bg-elevated border border-brown-300 text-text-primary'
                    : 'text-text-secondary'
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
, "Akan datang ("
                  , upcomingRes.length, ")"
              )
              , React.createElement('button', {
                type: "button",
                onClick: () => setResSubTab('history'),
                className: `h-9 px-4 rounded-full text-[13px] font-semibold cursor-pointer ${
                  resSubTab === 'history'
                    ? 'bg-bg-elevated border border-brown-300 text-text-primary'
                    : 'text-text-secondary'
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}
, "Riwayat ("
                 , historyRes.length, ")"
              )
            )

            , shownReservations.length === 0 ? (
              React.createElement(EmptyState, {
                icon: "cup",
                title: "Belum ada reservasi"  ,
                description: "Yuk pesan meja untuk menikmati kopi bersama kucing-kucing Vedora."        ,
                actionLabel: "Reservasi Sekarang" ,
                onAction: () => navigate('/reservasi'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
              )
            ) : (
              React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}
                , shownReservations.map((r) => {
                  const st = RES_STATUS_MAP[r.status];
                  return (
                    React.createElement('button', {
                      key: r.id,
                      type: "button",
                      onClick: () => setSelectedRes(r),
                      className: "w-full text-left bg-bg-surface border border-border-subtle rounded-[16px] p-4 hover:border-brown-300 transition-colors cursor-pointer space-y-2.5"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 166}}

                      , React.createElement('div', { className: "flex items-center justify-between gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 172}}
                        , React.createElement('span', { className: "font-mono font-semibold text-[15px] text-accent-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}}
                          , r.code
                        )
                        , React.createElement(Badge, { tone: st.tone, __self: this, __source: {fileName: _jsxFileName, lineNumber: 176}}, st.label)
                      )
                      , React.createElement('div', { className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-text-secondary"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}
                        , React.createElement('span', { className: "inline-flex items-center gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
                          , React.createElement(Calendar, { className: "w-4 h-4 text-brown-300"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}} )
                          , formatDateFull(r.date), " · "  , formatTimeDot(r.startTime), "–"
                          , formatTimeDot(r.endTime)
                        )
                        , React.createElement('span', { className: "inline-flex items-center gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 184}}
                          , React.createElement(Users, { className: "w-4 h-4 text-brown-300"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}} )
                          , r.guests, " tamu"
                        )
                      )
                    )
                  );
                })
              )
            )
          )
        )

        /* TAB 2: FAVORIT */
        , tab === 'favorit' && (
          React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}}
            , React.createElement('div', { className: "inline-flex p-1 rounded-[12px] bg-bg-surface border border-border-subtle"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 200}}
              , React.createElement('button', {
                type: "button",
                onClick: () => setFavType('menu'),
                className: `h-9 px-4 rounded-[10px] text-[13px] font-semibold cursor-pointer ${
                  favType === 'menu' ? 'bg-bg-elevated text-text-primary' : 'text-text-secondary'
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 201}}
, "Menu ("
                 , favMenus.length, ")"
              )
              , React.createElement('button', {
                type: "button",
                onClick: () => setFavType('kucing'),
                className: `h-9 px-4 rounded-[10px] text-[13px] font-semibold cursor-pointer ${
                  favType === 'kucing' ? 'bg-bg-elevated text-text-primary' : 'text-text-secondary'
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 210}}
, "Kucing ("
                 , favCats.length, ")"
              )
            )

            , favType === 'menu' ? (
              favMenus.length === 0 ? (
                React.createElement(EmptyState, {
                  icon: "cup",
                  title: "Belum ada menu favorit"   ,
                  description: "Ketuk ikon hati pada menu yang kamu suka untuk menyimpannya di sini."           ,
                  actionLabel: "Jelajah Menu" ,
                  onAction: () => navigate('/menu'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 223}}
                )
              ) : (
                React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-3 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}
                  , favMenus.map((m) => (
                    React.createElement(MenuCard, { key: m.id, item: m, __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}} )
                  ))
                )
              )
            ) : favCats.length === 0 ? (
              React.createElement(EmptyState, {
                icon: "cat",
                title: "Belum ada kucing favorit"   ,
                description: "Kenalan dengan kucing Vedora dan simpan favoritmu."      ,
                actionLabel: "Kenalan dengan Kucing"  ,
                onAction: () => navigate('/kucing'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 238}}
              )
            ) : (
              React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-3 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}
                , favCats.map((c) => (
                  React.createElement(CatCard, { key: c.id, cat: c, __self: this, __source: {fileName: _jsxFileName, lineNumber: 248}} )
                ))
              )
            )
          )
        )

        /* TAB 3: ULASAN */
        , tab === 'ulasan' && (
          React.createElement('div', { className: "bg-bg-surface border border-border-subtle rounded-[16px] p-5 sm:p-6"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 257}}
            , myReview ? (
              React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 259}}
                , React.createElement('div', { className: "flex items-center justify-between gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 260}}
                  , React.createElement(StarRating, { value: myReview.rating, size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 261}} )
                  , React.createElement(Badge, {
                    tone: 
                      myReview.status === 'approved'
                        ? 'success'
                        : myReview.status === 'rejected'
                        ? 'danger'
                        : 'warning'
                    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 262}}

                    , myReview.status === 'approved'
                      ? 'Ditampilkan'
                      : myReview.status === 'rejected'
                      ? 'Ditolak'
                      : 'Menunggu moderasi'
                  )
                )
                , React.createElement('p', { className: "text-[15px] leading-[24px] text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 278}}, myReview.comment)
                , React.createElement('p', { className: "text-[12px] text-text-muted" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, "Satu ulasan per akun · Dikirim "
                        , formatDateFull(myReview.createdAt)
                )
              )
            ) : (
              React.createElement('form', {
                onSubmit: (e) => {
                  e.preventDefault();
                  if (comment.trim().length < 10) return;
                  submitReview(rating, comment);
                },
                className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 284}}

                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 292}}
                  , React.createElement('h2', { className: "font-serif font-semibold text-[22px] text-text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 293}}, "Bagikan Pengalamanmu"

                  )
                  , React.createElement('p', { className: "text-[13px] text-text-secondary mt-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 296}}, "Ulasan tampil setelah disetujui admin."

                  )
                )

                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 301}}
                  , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 302}}, "Rating")
                  , React.createElement(StarRating, { value: rating, onChange: setRating, size: 28, __self: this, __source: {fileName: _jsxFileName, lineNumber: 303}} )
                )

                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 306}}
                  , React.createElement('div', { className: "flex justify-between text-[13px] text-text-secondary mb-1.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 307}}
                    , React.createElement('label', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 308}}, "Komentar (10–500 karakter)"  )
                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 309}}, comment.length, "/500")
                  )
                  , React.createElement('textarea', {
                    rows: 4,
                    minLength: 10,
                    maxLength: 500,
                    required: true,
                    value: comment,
                    onChange: (e) => setComment(e.target.value),
                    placeholder: "Ceritakan suasana, kopi, atau kucing favoritmu di Vedora..."       ,
                    className: "w-full p-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 311}}
                  )
                )

                , React.createElement(Button, {
                  type: "submit",
                  fullWidth: true,
                  disabled: !isOnline || comment.trim().length < 10, __self: this, __source: {fileName: _jsxFileName, lineNumber: 323}}
, "Kirim Ulasan"

                )
              )
            )
          )
        )

        /* TAB 4: PROFIL */
        , tab === 'profil' && (
          React.createElement('div', { className: "bg-bg-surface border border-border-subtle rounded-[16px] p-5 sm:p-6 space-y-5"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 337}}
            , React.createElement('form', {
              onSubmit: (e) => {
                e.preventDefault();
                updateProfile(profileName, profilePhone);
              },
              className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 338}}

              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 345}}
                , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 346}}, "Email")
                , React.createElement('input', {
                  type: "email",
                  value: currentUser.email,
                  disabled: true,
                  className: "w-full h-12 px-4 rounded-[12px] bg-bg-base border border-border-subtle text-text-muted cursor-not-allowed"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 347}}
                )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 354}}
                , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 355}}, "Nama lengkap" )
                , React.createElement('input', {
                  type: "text",
                  required: true,
                  value: profileName,
                  onChange: (e) => setProfileName(e.target.value),
                  className: "w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 356}}
                )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 364}}
                , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 365}}, "Nomor HP" )
                , React.createElement('input', {
                  type: "tel",
                  required: true,
                  value: profilePhone,
                  onChange: (e) => setProfilePhone(e.target.value),
                  className: "w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 366}}
                )
              )
              , React.createElement(Button, { type: "submit", fullWidth: true, disabled: !isOnline, __self: this, __source: {fileName: _jsxFileName, lineNumber: 374}}, "Simpan"

              )
            )

            , React.createElement('div', { className: "pt-4 border-t border-border-subtle"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 379}}
              , React.createElement(Button, {
                variant: "destructive",
                fullWidth: true,
                onClick: () => setLogoutConfirm(true), __self: this, __source: {fileName: _jsxFileName, lineNumber: 380}}

                , React.createElement(LogOut, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 385}} ), "Keluar"

              )
            )
          )
        )
      )

      /* Reservation Detail BottomSheet */
      , React.createElement(BottomSheet, {
        open: Boolean(selectedRes),
        onClose: () => setSelectedRes(null),
        title: "Detail Reservasi" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 394}}

        , selectedRes && (
          React.createElement('div', { className: "space-y-5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 400}}
            , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 401}}
              , React.createElement('span', { className: "font-mono font-semibold text-[20px] text-accent-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 402}}
                , selectedRes.code
              )
              , React.createElement(Badge, { tone: RES_STATUS_MAP[selectedRes.status].tone, __self: this, __source: {fileName: _jsxFileName, lineNumber: 405}}
                , RES_STATUS_MAP[selectedRes.status].label
              )
            )

            , React.createElement('div', { className: "bg-bg-surface border border-border-subtle rounded-[12px] p-4 space-y-2.5 text-[14px]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 410}}
              , React.createElement('div', { className: "flex justify-between" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 411}}
                , React.createElement('span', { className: "text-text-secondary", __self: this, __source: {fileName: _jsxFileName, lineNumber: 412}}, "Tanggal")
                , React.createElement('span', { className: "text-text-primary font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 413}}
                  , formatDateFull(selectedRes.date)
                )
              )
              , React.createElement('div', { className: "flex justify-between" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 417}}
                , React.createElement('span', { className: "text-text-secondary", __self: this, __source: {fileName: _jsxFileName, lineNumber: 418}}, "Jam")
                , React.createElement('span', { className: "text-text-primary font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 419}}
                  , formatTimeDot(selectedRes.startTime), "–", formatTimeDot(selectedRes.endTime)
                )
              )
              , React.createElement('div', { className: "flex justify-between" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 423}}
                , React.createElement('span', { className: "text-text-secondary", __self: this, __source: {fileName: _jsxFileName, lineNumber: 424}}, "Jumlah tamu" )
                , React.createElement('span', { className: "text-text-primary font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 425}}, selectedRes.guests, " orang" )
              )
              , React.createElement('div', { className: "flex justify-between" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 427}}
                , React.createElement('span', { className: "text-text-secondary", __self: this, __source: {fileName: _jsxFileName, lineNumber: 428}}, "Nama")
                , React.createElement('span', { className: "text-text-primary font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 429}}, selectedRes.customerName)
              )
              , React.createElement('div', { className: "flex justify-between" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 431}}
                , React.createElement('span', { className: "text-text-secondary", __self: this, __source: {fileName: _jsxFileName, lineNumber: 432}}, "Nomor HP" )
                , React.createElement('span', { className: "text-text-primary font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 433}}, selectedRes.customerPhone)
              )
              , selectedRes.notes && (
                React.createElement('div', { className: "pt-2 border-t border-border-subtle"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 436}}
                  , React.createElement('div', { className: "text-text-secondary text-[12px] mb-0.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 437}}, "Catatan")
                  , React.createElement('div', { className: "text-text-primary", __self: this, __source: {fileName: _jsxFileName, lineNumber: 438}}, selectedRes.notes)
                )
              )
            )

            , (selectedRes.status === 'pending' || selectedRes.status === 'confirmed') && (
              React.createElement(Button, {
                variant: "destructive",
                fullWidth: true,
                disabled: !isOnline,
                onClick: () => {
                  setCancelTargetId(selectedRes.id);
                  setSelectedRes(null);
                }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 444}}
, "Batalkan reservasi"

              )
            )
          )
        )
      )

      , React.createElement(ConfirmDialog, {
        open: Boolean(cancelTargetId),
        title: "Batalkan reservasi?" ,
        description: "Kursi yang sudah kamu pesan akan dilepas kembali untuk tamu lain."          ,
        confirmLabel: "Ya, batalkan" ,
        cancelLabel: "Kembali",
        destructive: true,
        onCancel: () => setCancelTargetId(null),
        onConfirm: () => {
          if (cancelTargetId) cancelMyReservation(cancelTargetId);
          setCancelTargetId(null);
        }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 460}}
      )

      , React.createElement(ConfirmDialog, {
        open: logoutConfirm,
        title: "Keluar dari akun?"  ,
        description: "Kamu perlu masuk kembali untuk melihat reservasi dan favorit."        ,
        confirmLabel: "Keluar",
        cancelLabel: "Batal",
        destructive: true,
        onCancel: () => setLogoutConfirm(false),
        onConfirm: () => {
          setLogoutConfirm(false);
          logout();
          navigate('/');
        }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 474}}
      )
    )
  );
};
