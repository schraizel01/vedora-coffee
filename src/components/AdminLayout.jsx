const _jsxFileName = "src\\components\\AdminLayout.tsx";import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Coffee,
  Cat,
  Sparkles,
  CalendarCheck,
  MessageSquareQuote,
  Settings,
  LogOut,
  MoreHorizontal,
  ExternalLink,
  WifiOff,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { BottomSheet, ConfirmDialog } from './ui';
import { ForbiddenPage } from '../pages/StatusPages';

export const AdminLayout



 = ({ title, action, children }) => {
  const { currentUser, reservations, reviews, isOnline, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  if (!currentUser) {
    return React.createElement(Navigate, { to: "/masuk", replace: true, state: { from: location.pathname }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}} );
  }
  if (currentUser.role !== 'admin') {
    return React.createElement(ForbiddenPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 36}} );
  }

  const pendingResCount = reservations.filter((r) => r.status === 'pending').length;
  const pendingRevCount = reviews.filter((r) => r.status === 'pending').length;

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/admin/menu', label: 'Menu', icon: Coffee },
    { to: '/admin/kucing', label: 'Kucing', icon: Cat },
    { to: '/admin/promo', label: 'Promo & Event', icon: Sparkles },
    {
      to: '/admin/reservasi',
      label: 'Reservasi',
      icon: CalendarCheck,
      badge: pendingResCount,
    },
    {
      to: '/admin/ulasan',
      label: 'Ulasan',
      icon: MessageSquareQuote,
      badge: pendingRevCount,
    },
    { to: '/admin/pengaturan', label: 'Pengaturan', icon: Settings },
  ];

  const isActive = (to, exact) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    React.createElement('div', { className: "min-h-screen bg-bg-base text-text-primary flex"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}
      /* Desktop Sidebar 240px */
      , React.createElement('aside', { className: "hidden lg:flex w-[240px] shrink-0 bg-bg-surface border-r border-border-subtle flex-col fixed inset-y-0 left-0 z-30"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}
        , React.createElement('div', { className: "h-16 px-5 flex items-center border-b border-border-subtle"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}
          , React.createElement(Link, { to: "/admin", __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}}
            , React.createElement(Logo, { variant: "horizontal", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 71}} )
          )
        )

        , React.createElement('nav', { className: "flex-1 p-3 space-y-1 overflow-y-auto"   , 'aria-label': "Menu admin" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}
          , navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to, item.exact);
            return (
              React.createElement(Link, {
                key: item.to,
                to: item.to,
                className: `flex items-center justify-between px-3.5 h-11 rounded-[12px] text-[14px] font-medium transition-colors ${
                  active
                    ? 'bg-accent-500/16 text-accent-500 font-semibold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/60'
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}

                , React.createElement('span', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
                  , React.createElement(Icon, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}} )
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}, item.label)
                )
                , item.badge ? (
                  React.createElement('span', { className: "px-2 py-0.5 rounded-full bg-accent-500 text-on-accent text-[11px] font-bold"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}
                    , item.badge
                  )
                ) : null
              )
            );
          })
        )

        , React.createElement('div', { className: "p-3 border-t border-border-subtle space-y-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}
          , React.createElement(Link, {
            to: "/",
            className: "flex items-center gap-2.5 px-3.5 h-10 rounded-[12px] text-[13px] text-text-secondary hover:text-text-primary hover:bg-bg-elevated/60"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}

            , React.createElement(ExternalLink, { className: "w-4 h-4" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}, "Lihat Situs Publik"  )
          )
          , React.createElement('div', { className: "flex items-center justify-between px-3 py-2 rounded-[12px] bg-bg-elevated/50"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
            , React.createElement('div', { className: "flex items-center gap-2.5 min-w-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}
              , React.createElement('span', { className: "w-8 h-8 rounded-full bg-accent-500/20 text-accent-500 font-semibold text-[13px] flex items-center justify-center shrink-0"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}}
                , currentUser.name.charAt(0).toUpperCase()
              )
              , React.createElement('span', { className: "text-[13px] font-medium text-text-primary truncate"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}
                , currentUser.name
              )
            )
            , React.createElement('button', {
              type: "button",
              onClick: () => setLogoutOpen(true),
              'aria-label': "Keluar",
              className: "w-8 h-8 flex items-center justify-center text-text-muted hover:text-status-danger cursor-pointer"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}

              , React.createElement(LogOut, { className: "w-4 h-4" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}} )
            )
          )
        )
      )

      /* Main Content Area */
      , React.createElement('div', { className: "flex-1 lg:pl-[240px] flex flex-col min-w-0"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}
        /* Mobile Top Bar */
        , React.createElement('header', { className: "lg:hidden sticky top-0 z-30 bg-bg-surface/95 backdrop-blur-md border-b border-border-subtle"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}
          , React.createElement('div', { className: "h-14 px-4 flex items-center justify-between gap-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}
            , React.createElement('h1', { className: "font-serif font-semibold text-[20px] text-text-primary truncate"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
              , title
            )
            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}
              , action
              , React.createElement('span', { className: "w-8 h-8 rounded-full bg-accent-500/20 text-accent-500 font-semibold text-[13px] flex items-center justify-center shrink-0"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}
                , currentUser.name.charAt(0).toUpperCase()
              )
            )
          )
          , !isOnline && (
            React.createElement('div', { className: "bg-[#E0B04A]/18 border-t border-[#E0B04A]/30 text-[#E0B04A] px-4 py-1.5 text-[12px] flex items-center justify-center gap-2"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
              , React.createElement(WifiOff, { className: "w-3.5 h-3.5 shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 150}}, "Kamu sedang offline. Aksi tulis dinonaktifkan."     )
            )
          )
        )

        /* Desktop Top Header */
        , React.createElement('div', { className: "hidden lg:block sticky top-0 z-20 bg-bg-base/95 backdrop-blur-sm border-b border-border-subtle"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}
          , React.createElement('div', { className: "max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-4"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
            , React.createElement('h1', { className: "font-serif font-semibold text-[26px] text-text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}, title)
            , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}, action)
          )
          , !isOnline && (
            React.createElement('div', { className: "bg-[#E0B04A]/18 border-t border-[#E0B04A]/30 text-[#E0B04A] px-6 py-1.5 text-[13px] flex items-center gap-2"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}
              , React.createElement(WifiOff, { className: "w-4 h-4 shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 164}}, "Kamu sedang offline. Seluruh aksi tulis dinonaktifkan."      )
            )
          )
        )

        , React.createElement('main', { className: "flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-5 pb-24 lg:pb-10"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}}
          , children
        )
      )

      /* Mobile Bottom Nav (4 tabs: Dashboard, Reservasi, Menu, Lainnya) */
      , React.createElement('nav', {
        className: "lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-bg-surface/95 backdrop-blur-md border-t border-border-subtle pb-safe"          ,
        'aria-label': "Navigasi admin bawah"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 175}}

        , React.createElement('div', { className: "h-16 grid grid-cols-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
          , React.createElement(Link, {
            to: "/admin",
            className: `flex flex-col items-center justify-center gap-1 text-[11px] font-medium ${
              isActive('/admin', true) ? 'text-accent-500' : 'text-text-secondary'
            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}

            , React.createElement(LayoutDashboard, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 187}}, "Dashboard")
          )
          , React.createElement(Link, {
            to: "/admin/reservasi",
            className: `relative flex flex-col items-center justify-center gap-1 text-[11px] font-medium ${
              isActive('/admin/reservasi') ? 'text-accent-500' : 'text-text-secondary'
            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}

            , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 195}}
              , React.createElement(CalendarCheck, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}} )
              , pendingResCount > 0 && (
                React.createElement('span', { className: "absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-accent-500 text-on-accent text-[10px] font-bold flex items-center justify-center"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}
                  , pendingResCount
                )
              )
            )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}, "Reservasi")
          )
          , React.createElement(Link, {
            to: "/admin/menu",
            className: `flex flex-col items-center justify-center gap-1 text-[11px] font-medium ${
              isActive('/admin/menu') ? 'text-accent-500' : 'text-text-secondary'
            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 205}}

            , React.createElement(Coffee, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 211}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 212}}, "Menu")
          )
          , React.createElement('button', {
            type: "button",
            onClick: () => setMoreOpen(true),
            className: "flex flex-col items-center justify-center gap-1 text-[11px] font-medium text-text-secondary cursor-pointer"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 214}}

            , React.createElement(MoreHorizontal, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 219}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 220}}, "Lainnya")
          )
        )
      )

      /* Mobile "Lainnya" BottomSheet */
      , React.createElement(BottomSheet, { open: moreOpen, onClose: () => setMoreOpen(false), title: "Menu Admin Lainnya"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}}
        , React.createElement('div', { className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 227}}
          , [
            { to: '/admin/kucing', label: 'Kelola Kucing', icon: Cat },
            { to: '/admin/promo', label: 'Kelola Promo & Event', icon: Sparkles },
            {
              to: '/admin/ulasan',
              label: 'Moderasi Ulasan',
              icon: MessageSquareQuote,
              badge: pendingRevCount,
            },
            { to: '/admin/pengaturan', label: 'Profil & Pengaturan Kafe', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              React.createElement(Link, {
                key: item.to,
                to: item.to,
                onClick: () => setMoreOpen(false),
                className: "flex items-center justify-between px-4 h-12 rounded-[12px] bg-bg-surface border border-border-subtle text-text-primary hover:border-brown-300"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 241}}

                , React.createElement('span', { className: "flex items-center gap-3 text-[15px] font-medium"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 247}}
                  , React.createElement(Icon, { className: "w-5 h-5 text-brown-300"  , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 248}} )
                  , item.label
                )
                , item.badge ? (
                  React.createElement('span', { className: "px-2 py-0.5 rounded-full bg-accent-500 text-on-accent text-[11px] font-bold"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 252}}
                    , item.badge
                  )
                ) : null
              )
            );
          })
          , React.createElement(Link, {
            to: "/",
            onClick: () => setMoreOpen(false),
            className: "flex items-center gap-3 px-4 h-12 rounded-[12px] bg-bg-surface border border-border-subtle text-text-secondary"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 259}}

            , React.createElement(ExternalLink, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 264}} )
            , React.createElement('span', { className: "text-[15px] font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 265}}, "Lihat Situs Publik"  )
          )
          , React.createElement('button', {
            type: "button",
            onClick: () => {
              setMoreOpen(false);
              setLogoutOpen(true);
            },
            className: "w-full flex items-center gap-3 px-4 h-12 rounded-[12px] bg-status-danger/16 text-status-danger font-semibold text-[15px] cursor-pointer mt-2"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}

            , React.createElement(LogOut, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 275}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 276}}, "Keluar")
          )
        )
      )

      , React.createElement(ConfirmDialog, {
        open: logoutOpen,
        title: "Keluar dari Admin?"  ,
        description: "Sesi admin akan ditutup dan kamu diarahkan ke halaman utama."         ,
        confirmLabel: "Keluar",
        cancelLabel: "Batal",
        destructive: true,
        onCancel: () => setLogoutOpen(false),
        onConfirm: () => {
          setLogoutOpen(false);
          logout();
          navigate('/');
        }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 281}}
      )
    )
  );
};
