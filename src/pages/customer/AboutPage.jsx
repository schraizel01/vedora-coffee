const _jsxFileName = "src\\pages\\customer\\AboutPage.tsx";import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Coffee,
  Cat,
  Sparkles,
  MapPin,
  Phone,
  MessageCircle,
  AtSign,
  Mail,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTimeDot, getCafeOpenStatus } from '../../utils/format';
import { CustomerLayout } from '../../components/CustomerLayout';
import { Logo } from '../../components/Logo';
import { Badge, Button, LazyImage } from '../../components/ui';

const CAFE_RULES = [
  'Cuci tangan atau gunakan hand sanitizer sebelum menyentuh kucing.',
  'Jangan membangunkan kucing yang sedang tidur nyenyak.',
  'Dilarang memberi makanan atau minuman manusia kepada kucing.',
  'Gunakan suara tenang dan hindari mengambil foto dengan lampu kilat (flash).',
  'Anak kecil di bawah 10 tahun wajib didampingi orang tua setiap saat.',
  'Biarkan kucing mendekat terlebih dahulu; jangan memaksa menggendong.',
];

export const AboutPage = () => {
  const { cafeInfo, isOnline } = useApp();
  const location = useLocation();
  const openStatus = getCafeOpenStatus(cafeInfo);
  const todayIndex = new Date().getDay();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [location.hash]);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${cafeInfo.latitude},${cafeInfo.longitude}`;

  return (
    React.createElement(CustomerLayout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}
      /* 1. Hero with logo & tagline */
      , React.createElement('section', { className: "relative h-[320px] sm:h-[380px] overflow-hidden"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}
        , React.createElement('img', {
          src: cafeInfo.heroImage,
          alt: cafeInfo.name,
          className: "absolute inset-0 w-full h-full object-cover"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}
        )
        , React.createElement('div', { className: "absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/70 to-bg-base/40"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}} )
        , React.createElement('div', { className: "relative z-10 h-full max-w-[1120px] mx-auto px-4 sm:px-6 flex flex-col justify-end pb-8"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}
          , React.createElement(Logo, { variant: "horizontal", size: "lg", __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}} )
          , React.createElement('p', { className: "text-[15px] text-text-secondary mt-2 max-w-md"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}}, cafeInfo.tagline)
        )
      )

      , React.createElement('div', { className: "max-w-[1120px] mx-auto px-4 sm:px-6 space-y-12 mt-8"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
        /* 2. Cerita Vedora (62:38 split on desktop) */
        , React.createElement('section', { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
          , React.createElement('div', { className: "lg:col-span-7 space-y-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}
            , React.createElement('h1', { className: "font-serif font-semibold text-[33px] leading-[40px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}, "Tentang Kami"

            )
            , React.createElement('p', { className: "text-[16px] leading-[26px] text-text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}}, cafeInfo.description)
          )
          , React.createElement('div', { className: "lg:col-span-5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}}
            , React.createElement(LazyImage, {
              src: cafeInfo.aboutImage,
              alt: "Interior Vedora Coffee"  ,
              aspectClass: "aspect-[16/10]",
              className: "rounded-[16px] border border-border-subtle"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}
            )
          )
        )

        /* 3. Tiga Keunggulan */
        , React.createElement('section', { className: "grid grid-cols-1 sm:grid-cols-3 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}
          , [
            {
              icon: Coffee,
              title: 'Kopi Pilihan',
              desc: 'Biji specialty Nusantara yang diseduh segar oleh barista berpengalaman.',
            },
            {
              icon: Cat,
              title: 'Kucing Sehat & Bahagia',
              desc: 'Pemeriksaan rutin dokter hewan dan jam istirahat terjadwal setiap hari.',
            },
            {
              icon: Sparkles,
              title: 'Suasana Hangat',
              desc: 'Pencahayaan lembut dan kapasitas terbatas agar tetap tenang seperti rumah.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              React.createElement('div', {
                key: item.title,
                className: "bg-bg-surface border border-border-subtle rounded-[16px] p-5 space-y-2.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}

                , React.createElement('div', { className: "w-11 h-11 rounded-[12px] bg-accent-500/16 text-accent-500 flex items-center justify-center"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
                  , React.createElement(Icon, { className: "w-5 h-5" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}} )
                )
                , React.createElement('h2', { className: "font-sans font-semibold text-[18px] text-text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
                  , item.title
                )
                , React.createElement('p', { className: "text-[14px] leading-[22px] text-text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}}, item.desc)
              )
            );
          })
        )

        /* 4. Jam Operasional & 5. Lokasi */
        , React.createElement('section', { className: "grid grid-cols-1 lg:grid-cols-2 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
          /* Jam Operasional */
          , React.createElement('div', { className: "bg-bg-surface border border-border-subtle rounded-[16px] p-5 sm:p-6 space-y-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}
            , React.createElement('div', { className: "flex items-center justify-between gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}
              , React.createElement('h2', { className: "font-serif font-semibold text-[26px] leading-[34px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}, "Jam Operasional"

              )
              , React.createElement(Badge, { tone: openStatus.isOpen ? 'success' : 'warning', __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}}
                , openStatus.isOpen ? 'Buka' : 'Tutup'
              )
            )
            , React.createElement('div', { className: "divide-y divide-border-subtle/70" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}
              , cafeInfo.operatingHours.map((h) => {
                const isToday = h.dayIndex === todayIndex;
                return (
                  React.createElement('div', {
                    key: h.dayIndex,
                    className: `py-2.5 flex items-center justify-between text-[14px] ${
                      isToday ? 'text-accent-500 font-semibold' : 'text-text-secondary'
                    }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}

                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}
                      , h.dayName, " " , isToday && '(Hari ini)'
                    )
                    , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
                      , h.isClosed
                        ? 'Tutup'
                        : `${formatTimeDot(h.openTime)} – ${formatTimeDot(h.closeTime)}`
                    )
                  )
                );
              })
            )
          )

          /* Lokasi */
          , React.createElement('div', {
            id: "lokasi",
            className: "bg-bg-surface border border-border-subtle rounded-[16px] p-5 sm:p-6 flex flex-col justify-between gap-4 scroll-mt-20"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}

            , React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}}
              , React.createElement('h2', { className: "font-serif font-semibold text-[26px] leading-[34px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}}, "Lokasi"

              )
              , React.createElement('div', { className: "flex items-start gap-2.5 text-[15px] text-text-secondary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 164}}
                , React.createElement(MapPin, { className: "w-5 h-5 text-accent-500 shrink-0 mt-0.5"    , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}} )
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 166}}, cafeInfo.address)
              )

              , isOnline ? (
                React.createElement('div', { className: "rounded-[12px] overflow-hidden border border-border-subtle h-44 bg-bg-elevated relative"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}
                  , React.createElement('iframe', {
                    title: "Peta Lokasi Vedora Coffee"   ,
                    src: `https://www.openstreetmap.org/export/embed.html?bbox=${
                      cafeInfo.longitude - 0.008
                    }%2C${cafeInfo.latitude - 0.005}%2C${cafeInfo.longitude + 0.008}%2C${
                      cafeInfo.latitude + 0.005
                    }&layer=mapnik&marker=${cafeInfo.latitude}%2C${cafeInfo.longitude}`,
                    className: "w-full h-full border-0 opacity-85 invert-[0.9] hue-rotate-180"     ,
                    loading: "lazy", __self: this, __source: {fileName: _jsxFileName, lineNumber: 171}}
                  )
                )
              ) : (
                React.createElement('div', { className: "p-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-[13px] text-text-secondary"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}, "Peta tidak tersedia saat offline. Alamat: "
                        , cafeInfo.address
                )
              )
            )

            , React.createElement('a', {
              href: isOnline ? mapsUrl : undefined,
              target: "_blank",
              rel: "noreferrer",
              'aria-disabled': !isOnline,
              onClick: (e) => {
                if (!isOnline) e.preventDefault();
              }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}

              , React.createElement(Button, { variant: "secondary", fullWidth: true, disabled: !isOnline, __self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}
                , React.createElement(ExternalLink, { className: "w-4 h-4" , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 199}} )
                , isOnline ? 'Buka di Google Maps' : 'Butuh koneksi untuk membuka Maps'
              )
            )
          )
        )

        /* 6. Kontak */
        , React.createElement('section', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}}
          , React.createElement('h2', { className: "font-serif font-semibold text-[26px] leading-[34px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 208}}, "Kontak Kami"

          )
          , React.createElement('div', { className: "grid grid-cols-2 lg:grid-cols-4 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 211}}
            , React.createElement('a', {
              href: `https://wa.me/${cafeInfo.whatsapp}`,
              target: "_blank",
              rel: "noreferrer",
              className: "flex items-center gap-3 p-4 rounded-[16px] bg-bg-surface border border-border-subtle hover:border-brown-300 transition-colors"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 212}}

              , React.createElement(MessageCircle, { className: "w-5 h-5 text-accent-500 shrink-0"   , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 218}} )
              , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 219}}
                , React.createElement('div', { className: "text-[14px] font-semibold text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}}, "WhatsApp")
                , React.createElement('div', { className: "text-[12px] text-text-secondary truncate"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}}, "Chat langsung" )
              )
            )
            , React.createElement('a', {
              href: `tel:${cafeInfo.phone}`,
              className: "flex items-center gap-3 p-4 rounded-[16px] bg-bg-surface border border-border-subtle hover:border-brown-300 transition-colors"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 224}}

              , React.createElement(Phone, { className: "w-5 h-5 text-accent-500 shrink-0"   , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 228}} )
              , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}
                , React.createElement('div', { className: "text-[14px] font-semibold text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 230}}, "Telepon")
                , React.createElement('div', { className: "text-[12px] text-text-secondary truncate"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}, cafeInfo.phone)
              )
            )
            , React.createElement('a', {
              href: `https://instagram.com/${cafeInfo.instagram.replace('@', '')}`,
              target: "_blank",
              rel: "noreferrer",
              className: "flex items-center gap-3 p-4 rounded-[16px] bg-bg-surface border border-border-subtle hover:border-brown-300 transition-colors"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 234}}

              , React.createElement(AtSign, { className: "w-5 h-5 text-accent-500 shrink-0"   , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 240}} )
              , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 241}}
                , React.createElement('div', { className: "text-[14px] font-semibold text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 242}}, "Instagram")
                , React.createElement('div', { className: "text-[12px] text-text-secondary truncate"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 243}}, cafeInfo.instagram)
              )
            )
            , React.createElement('a', {
              href: `mailto:${cafeInfo.email}`,
              className: "flex items-center gap-3 p-4 rounded-[16px] bg-bg-surface border border-border-subtle hover:border-brown-300 transition-colors"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}

              , React.createElement(Mail, { className: "w-5 h-5 text-accent-500 shrink-0"   , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 250}} )
              , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 251}}
                , React.createElement('div', { className: "text-[14px] font-semibold text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 252}}, "Email")
                , React.createElement('div', { className: "text-[12px] text-text-secondary truncate"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 253}}, cafeInfo.email)
              )
            )
          )
        )

        /* 7. Aturan di Kafe */
        , React.createElement('section', {
          id: "aturan",
          className: "bg-bg-surface border border-border-subtle rounded-[16px] p-5 sm:p-6 space-y-4 scroll-mt-20"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 260}}

          , React.createElement('div', { className: "flex items-center gap-2.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 264}}
            , React.createElement(ShieldCheck, { className: "w-6 h-6 text-accent-500 shrink-0"   , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 265}} )
            , React.createElement('h2', { className: "font-serif font-semibold text-[26px] leading-[34px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 266}}, "Aturan di Kafe"

            )
          )
          , React.createElement('ul', { className: "grid grid-cols-1 md:grid-cols-2 gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 270}}
            , CAFE_RULES.map((rule, idx) => (
              React.createElement('li', {
                key: idx,
                className: "flex items-start gap-3 p-3.5 rounded-[12px] bg-bg-elevated/60 border border-border-subtle/60 text-[14px] leading-[22px] text-text-secondary"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 272}}

                , React.createElement('span', { className: "w-6 h-6 rounded-full bg-accent-500/16 text-accent-500 text-[12px] font-semibold flex items-center justify-center shrink-0 mt-0.5"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 276}}
                  , idx + 1
                )
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 279}}, rule)
              )
            ))
          )
        )
      )
    )
  );
};