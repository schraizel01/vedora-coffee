const _jsxFileName = "src\\components\\CustomerLayout.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Coffee,
  Cat,
  Sparkles,
  User as UserIcon,
  Menu as MenuIcon,
  X,
  Download,
  Phone,
  MessageCircle,
  Info,
  WifiOff,
  Wifi,
  LayoutDashboard,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { BottomSheet, Button } from './ui';

export const CustomerLayout




 = ({
  children,
  transparentTopBar = false,
  hideBottomNav = false,
  hideTopBar = false,
}) => {
  const {
    currentUser,
    cafeInfo,
    isOnline,
    justReconnected,
    simulatedOffline,
    toggleSimulatedOffline,
    loginPromptMessage,
    closeLoginPrompt,
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const isTransparent = transparentTopBar && !scrolled;

  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/menu', label: 'Menu' },
    { to: '/kucing', label: 'Kucing' },
    { to: '/promo', label: 'Promo & Event' },
    { to: '/tentang', label: 'Tentang' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    React.createElement('div', { className: "min-h-screen bg-bg-base text-text-primary flex flex-col"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}
      , !hideTopBar && (
        React.createElement('header', {
          className: `fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
            isTransparent
              ? 'bg-gradient-to-b from-bg-base/80 to-transparent border-b border-transparent'
              : 'bg-bg-surface/95 backdrop-blur-md border-b border-border-subtle'
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}

          /* Mobile Top Bar (56px) */
          , React.createElement('div', { className: "lg:hidden h-14 px-4 flex items-center justify-between"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}
            , React.createElement(Link, { to: "/", 'aria-label': "Beranda Vedora Coffee"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
              , React.createElement(Logo, { variant: "horizontal", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}} )
            )
            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
              , React.createElement(Link, {
                to: "/reservasi",
                className: "h-9 px-3.5 rounded-full bg-accent-500 hover:bg-accent-600 text-on-accent font-semibold text-[13px] inline-flex items-center justify-center transition-colors"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}
, "Reservasi"

              )
              , React.createElement('button', {
                type: "button",
                onClick: () => setDrawerOpen(true),
                className: "w-11 h-11 flex items-center justify-center rounded-full text-text-primary hover:bg-bg-elevated/70 cursor-pointer"        ,
                'aria-label': "Buka menu" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}

                , React.createElement(MenuIcon, { className: "w-6 h-6" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}} )
              )
            )
          )

          /* Desktop Navbar */
          , React.createElement('div', { className: "hidden lg:flex max-w-[1120px] mx-auto h-16 px-6 items-center justify-between"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
            , React.createElement(Link, { to: "/", 'aria-label': "Beranda Vedora Coffee"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
              , React.createElement(Logo, { variant: "horizontal", size: "md", __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}} )
            )
            , React.createElement('nav', { className: "flex items-center gap-7"  , 'aria-label': "Navigasi utama" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
              , navLinks.map((link) => (
                React.createElement(Link, {
                  key: link.to,
                  to: link.to,
                  className: `text-[15px] font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-accent-500'
                      : 'text-text-secondary hover:text-text-primary'
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}

                  , link.label
                )
              ))
            )
            , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
              , _optionalChain([currentUser, 'optionalAccess', _ => _.role]) === 'admin' && (
                React.createElement(Link, {
                  to: "/admin",
                  className: "h-10 px-3.5 rounded-[12px] border border-border-subtle text-text-secondary hover:text-text-primary text-[14px] font-medium inline-flex items-center gap-1.5"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}

                  , React.createElement(LayoutDashboard, { className: "w-4 h-4" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}} ), "Admin"

                )
              )
              , React.createElement(Link, {
                to: "/reservasi",
                className: "h-10 px-4 rounded-[12px] bg-accent-500 hover:bg-accent-600 text-on-accent font-semibold text-[14px] inline-flex items-center justify-center transition-colors"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}
, "Reservasi Meja"

              )
              , currentUser ? (
                React.createElement(Link, {
                  to: "/akun",
                  className: "h-10 pl-1.5 pr-3.5 rounded-full bg-bg-elevated border border-border-subtle flex items-center gap-2 hover:border-brown-300 transition-colors"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}}

                  , React.createElement('span', { className: "w-7 h-7 rounded-full bg-accent-500/20 text-accent-500 font-semibold text-[13px] flex items-center justify-center"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 150}}
                    , currentUser.name.charAt(0).toUpperCase()
                  )
                  , React.createElement('span', { className: "text-[14px] font-medium text-text-primary max-w-[110px] truncate"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}
                    , currentUser.name.split(' ')[0]
                  )
                )
              ) : (
                React.createElement(Link, {
                  to: "/masuk",
                  className: "h-10 px-4 rounded-[12px] border border-brown-300 text-text-primary hover:bg-bg-elevated text-[14px] font-semibold inline-flex items-center justify-center transition-colors"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}
, "Masuk"

                )
              )
            )
          )

          /* Offline / Reconnected Banner */
          , !isOnline && (
            React.createElement('div', { className: "bg-[#E0B04A]/18 border-t border-[#E0B04A]/30 text-[#E0B04A] px-4 py-1.5 text-[13px] flex items-center justify-center gap-2"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}
              , React.createElement(WifiOff, { className: "w-4 h-4 shrink-0"  , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 171}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 172}}, "Kamu sedang offline. Menampilkan data tersimpan."     )
            )
          )
          , isOnline && justReconnected && (
            React.createElement('div', { className: "bg-[#6FA876]/18 border-t border-[#6FA876]/30 text-[#6FA876] px-4 py-1.5 text-[13px] flex items-center justify-center gap-2"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 176}}
              , React.createElement(Wifi, { className: "w-4 h-4 shrink-0"  , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}} )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}, "Kembali online" )
            )
          )
        )
      )

      /* Main Content */
      , React.createElement('main', {
        className: `flex-1 ${!hideTopBar && !transparentTopBar ? 'pt-14 lg:pt-16' : ''} ${
          !hideBottomNav ? 'pb-20 lg:pb-0' : ''
        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}}

        , children
      )

      /* Footer */
      , !hideBottomNav && (
        React.createElement('footer', { className: "bg-bg-surface border-t border-border-subtle mt-12"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 195}}
          , React.createElement('div', { className: "max-w-[1120px] mx-auto px-4 sm:px-6 py-10"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}}
            , React.createElement('div', { className: "flex flex-col md:flex-row md:items-center justify-between gap-6"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 197}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}
                , React.createElement(Logo, { variant: "horizontal", size: "md", __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}} )
                , React.createElement('p', { className: "text-[14px] text-text-secondary mt-2 max-w-sm"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 200}}
                  , cafeInfo.address
                )
              )
              , React.createElement('div', { className: "flex flex-wrap gap-5 text-[14px] text-text-secondary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 204}}
                , React.createElement(Link, { to: "/tentang", className: "hover:text-accent-500 transition-colors" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 205}}, "Tentang Vedora"

                )
                , React.createElement('a', {
                  href: `https://wa.me/${cafeInfo.whatsapp}`,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "hover:text-accent-500 transition-colors" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 208}}
, "WhatsApp"

                )
                , React.createElement('a', {
                  href: `https://instagram.com/${cafeInfo.instagram.replace('@', '')}`,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "hover:text-accent-500 transition-colors" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 216}}
, "Instagram "
                   , cafeInfo.instagram
                )
              )
            )
            , React.createElement('div', { className: "border-t border-border-subtle mt-6 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px] text-text-muted"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}}
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 227}}, "© " , new Date().getFullYear(), " Vedora Coffee. Hak cipta dilindungi."     )
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 228}}, "Cat, Coffee & Eatery"   )
            )
          )
        )
      )

      /* Mobile Bottom Navigation (5 tabs, 64px + safe area) */
      , !hideBottomNav && (
        React.createElement('nav', {
          className: "lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-surface/95 backdrop-blur-md border-t border-border-subtle pb-safe"          ,
          'aria-label': "Navigasi bawah" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 236}}

          , React.createElement('div', { className: "h-16 grid grid-cols-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 240}}
            , [
              { to: '/', label: 'Beranda', icon: Home },
              { to: '/menu', label: 'Menu', icon: Coffee },
              { to: '/kucing', label: 'Kucing', icon: Cat },
              { to: '/promo', label: 'Promo', icon: Sparkles },
              {
                to: currentUser ? '/akun' : '/masuk',
                label: 'Akun',
                icon: UserIcon,
                matchPaths: ['/akun', '/masuk', '/daftar'],
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = tab.matchPaths
                ? tab.matchPaths.some((p) => location.pathname.startsWith(p))
                : isActive(tab.to);
              return (
                React.createElement(Link, {
                  key: tab.label,
                  to: tab.to,
                  className: `flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                    active ? 'text-accent-500' : 'text-text-secondary'
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 258}}

                  , React.createElement(Icon, { className: "w-6 h-6" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 265}} )
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 266}}, tab.label)
                )
              );
            })
          )
        )
      )

      /* Mobile Drawer (Menu ≡) */
      , drawerOpen && (
        React.createElement('div', { className: "fixed inset-0 z-50 lg:hidden flex justify-end"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 276}}
          , React.createElement('div', {
            className: "fixed inset-0 bg-black/70"  ,
            onClick: () => setDrawerOpen(false),
            'aria-hidden': "true", __self: this, __source: {fileName: _jsxFileName, lineNumber: 277}}
          )
          , React.createElement('div', { className: "relative z-10 w-72 max-w-[85vw] bg-bg-surface border-l border-border-subtle h-full flex flex-col p-5"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 282}}
            , React.createElement('div', { className: "flex items-center justify-between pb-4 border-b border-border-subtle"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 283}}
              , React.createElement(Logo, { variant: "horizontal", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 284}} )
              , React.createElement('button', {
                type: "button",
                onClick: () => setDrawerOpen(false),
                className: "w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary cursor-pointer"        ,
                'aria-label': "Tutup drawer" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 285}}

                , React.createElement(X, { className: "w-5 h-5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 291}} )
              )
            )
            , React.createElement('div', { className: "py-4 flex-1 space-y-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 294}}
              , React.createElement(Link, {
                to: "/tentang",
                className: "flex items-center gap-3 px-3 py-3 rounded-[12px] text-text-primary hover:bg-bg-elevated"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 295}}

                , React.createElement(Info, { className: "w-5 h-5 text-brown-300"  , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 299}} )
                , React.createElement('span', { className: "font-medium text-[15px]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 300}}, "Tentang Vedora" )
              )
              , React.createElement('button', {
                type: "button",
                onClick: () => {
                  setDrawerOpen(false);
                  setInstallModalOpen(true);
                },
                className: "w-full flex items-center gap-3 px-3 py-3 rounded-[12px] text-text-primary hover:bg-bg-elevated cursor-pointer text-left"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 302}}

                , React.createElement(Download, { className: "w-5 h-5 text-brown-300"  , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 310}} )
                , React.createElement('span', { className: "font-medium text-[15px]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 311}}, "Instal Aplikasi" )
              )
              , React.createElement('a', {
                href: `https://wa.me/${cafeInfo.whatsapp}`,
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center gap-3 px-3 py-3 rounded-[12px] text-text-primary hover:bg-bg-elevated"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 313}}

                , React.createElement(MessageCircle, { className: "w-5 h-5 text-brown-300"  , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 319}} )
                , React.createElement('span', { className: "font-medium text-[15px]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 320}}, "WhatsApp Kafe" )
              )
              , React.createElement('a', {
                href: `tel:${cafeInfo.phone}`,
                className: "flex items-center gap-3 px-3 py-3 rounded-[12px] text-text-primary hover:bg-bg-elevated"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 322}}

                , React.createElement(Phone, { className: "w-5 h-5 text-brown-300"  , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 326}} )
                , React.createElement('span', { className: "font-medium text-[15px]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 327}}, "Telepon (" , cafeInfo.phone, ")")
              )
              , _optionalChain([currentUser, 'optionalAccess', _2 => _2.role]) === 'admin' && (
                React.createElement(Link, {
                  to: "/admin",
                  className: "flex items-center gap-3 px-3 py-3 rounded-[12px] text-accent-500 bg-accent-500/10"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 330}}

                  , React.createElement(LayoutDashboard, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 334}} )
                  , React.createElement('span', { className: "font-semibold text-[15px]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 335}}, "Panel Admin" )
                )
              )
            )
            , React.createElement('div', { className: "pt-4 border-t border-border-subtle"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 339}}
              , React.createElement('button', {
                type: "button",
                onClick: toggleSimulatedOffline,
                className: "w-full flex items-center justify-between px-3 py-2.5 rounded-[12px] bg-bg-elevated text-[13px] text-text-secondary cursor-pointer"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 340}}

                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 345}}, "Mode Offline (Simulasi)"  )
                , React.createElement('span', {
                  className: `px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    simulatedOffline
                      ? 'bg-status-warning/20 text-status-warning'
                      : 'bg-bg-surface text-text-muted'
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 346}}

                  , simulatedOffline ? 'Aktif' : 'Nonaktif'
                )
              )
            )
          )
        )
      )

      /* Install PWA Instruction BottomSheet */
      , React.createElement(BottomSheet, {
        open: installModalOpen,
        onClose: () => setInstallModalOpen(false),
        title: "Instal Vedora Coffee"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 362}}

        , React.createElement('div', { className: "space-y-4 text-[14px] leading-[22px] text-text-secondary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 367}}
          , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 368}}, "Pasang aplikasi Vedora Coffee di layar utama perangkatmu untuk akses cepat ke menu, profil kucing, dan status reservasi."


          )
          , React.createElement('div', { className: "p-3.5 rounded-[12px] bg-bg-surface border border-border-subtle space-y-1.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 372}}
            , React.createElement('div', { className: "font-semibold text-text-primary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 373}}, "Pengguna iOS (Safari)"  )
            , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 374}}, "Ketuk ikon Bagikan (Share) di bilah bawah, lalu pilih “Tambahkan ke Layar Utama”."            )
          )
          , React.createElement('div', { className: "p-3.5 rounded-[12px] bg-bg-surface border border-border-subtle space-y-1.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 376}}
            , React.createElement('div', { className: "font-semibold text-text-primary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 377}}, "Pengguna Android (Chrome)"  )
            , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 378}}, "Ketuk menu titik tiga di pojok kanan atas browser, lalu pilih “Instal aplikasi”."            )
          )
          , React.createElement(Button, { fullWidth: true, onClick: () => setInstallModalOpen(false), __self: this, __source: {fileName: _jsxFileName, lineNumber: 380}}, "Mengerti"

          )
        )
      )

      /* Login Prompt Sheet (Triggered when logged-out user taps heart) */
      , React.createElement(BottomSheet, {
        open: Boolean(loginPromptMessage),
        onClose: closeLoginPrompt,
        title: "Masuk Diperlukan" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 387}}

        , React.createElement('div', { className: "space-y-5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 392}}
          , React.createElement('p', { className: "text-[15px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 393}}
            , loginPromptMessage || 'Masuk untuk menyimpan favorit dan membuat reservasi.'
          )
          , React.createElement('div', { className: "flex flex-col gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 396}}
            , React.createElement(Button, {
              fullWidth: true,
              onClick: () => {
                const msg = loginPromptMessage;
                closeLoginPrompt();
                navigate('/masuk', {
                  state: { from: location.pathname, contextMessage: msg },
                });
              }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 397}}
, "Masuk"

            )
            , React.createElement(Button, {
              variant: "secondary",
              fullWidth: true,
              onClick: () => {
                closeLoginPrompt();
                navigate('/daftar', { state: { from: location.pathname } });
              }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 409}}
, "Daftar Akun Baru"

            )
          )
        )
      )
    )
  );
};
