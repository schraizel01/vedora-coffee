const _jsxFileName = "src\\pages\\admin\\AdminPromoPage.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

import { formatDateShort, getPromoTimeState, getTodayISO, slugify } from '../../utils/format';
import { AdminLayout } from '../../components/AdminLayout';
import { AdminDrawerForm } from '../../components/AdminDrawerForm';
import { Badge, Button, ConfirmDialog, EmptyState, LazyImage } from '../../components/ui';

const DEFAULT_PROMO_IMAGE =
  'https://images.unsplash.com/photo-1619536094309-ad21bdc924a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200';

export const AdminPromoPage = () => {
  const { promos, isOnline, savePromo, deletePromo, togglePromoPublished } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [segment, setSegment] = useState('Semua');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(undefined);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Promo');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(DEFAULT_PROMO_IMAGE);
  const [startDate, setStartDate] = useState(getTodayISO());
  const [endDate, setEndDate] = useState(getTodayISO());
  const [isPublished, setIsPublished] = useState(true);
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (searchParams.get('new') === '1') {
      openNew();
      setSearchParams({});
    }
  }, [searchParams]);

  const openNew = () => {
    setEditingId(undefined);
    setTitle('');
    setType('Promo');
    setDescription('');
    setImage(DEFAULT_PROMO_IMAGE);
    setStartDate(getTodayISO());
    setEndDate(getTodayISO());
    setIsPublished(true);
    setDateError('');
    setDrawerOpen(true);
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    setTitle(p.title);
    setType(p.type);
    setDescription(p.description);
    setImage(p.image);
    setStartDate(p.startDate);
    setEndDate(p.endDate);
    setIsPublished(p.isPublished);
    setDateError('');
    setDrawerOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (endDate < startDate) {
      setDateError('Tanggal selesai tidak boleh sebelum tanggal mulai');
      return;
    }
    setDateError('');
    savePromo({
      id: editingId,
      slug: slugify(title) || 'promo-' + Date.now(),
      title: title.trim(),
      type,
      description: description.trim(),
      image: image.trim() || DEFAULT_PROMO_IMAGE,
      startDate,
      endDate,
      isPublished,
    });
    setDrawerOpen(false);
  };

  const filtered = useMemo(
    () => promos.filter((p) => segment === 'Semua' || p.type === segment),
    [promos, segment]
  );

  return (
    React.createElement(AdminLayout, {
      title: "Kelola Promo & Event"   ,
      action: 
        React.createElement(Button, { size: "sm", disabled: !isOnline, onClick: openNew, __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}
          , React.createElement(Plus, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}} ), "Tambah"

        )
      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}

      , React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}
        , React.createElement('div', { className: "inline-flex p-1 rounded-[12px] bg-bg-surface border border-border-subtle"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
          , (['Semua', 'Promo', 'Event'] ).map((t) => (
            React.createElement('button', {
              key: t,
              type: "button",
              onClick: () => setSegment(t),
              className: `h-10 px-5 rounded-[10px] text-[14px] font-semibold cursor-pointer ${
                segment === t ? 'bg-accent-500 text-on-accent' : 'text-text-secondary'
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}

              , t
            )
          ))
        )

        , filtered.length === 0 ? (
          React.createElement(EmptyState, { icon: "cup", title: "Belum ada promo atau event"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}} )
        ) : (
          React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
            , filtered.map((p) => {
              const state = getPromoTimeState(p.startDate, p.endDate);
              return (
                React.createElement('div', {
                  key: p.id,
                  className: "bg-bg-surface border border-border-subtle rounded-[16px] overflow-hidden flex flex-col"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}

                  , React.createElement(LazyImage, { src: p.image, alt: p.title, aspectClass: "aspect-[16/10]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}} )
                  , React.createElement('div', { className: "p-4 flex-1 flex flex-col justify-between gap-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
                    , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}
                      , React.createElement('div', { className: "flex flex-wrap items-center gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}
                        , React.createElement(Badge, { tone: p.type === 'Promo' ? 'accent' : 'info', __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}, p.type)
                        , state === 'ongoing' && React.createElement(Badge, { tone: "success", __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}, "Berlangsung")
                        , state === 'upcoming' && React.createElement(Badge, { tone: "info", __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}, "Segera")
                        , state === 'ended' && React.createElement(Badge, { tone: "neutral", __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}, "Berakhir")
                      )
                      , React.createElement('h3', { className: "font-semibold text-[16px] text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}, p.title)
                      , React.createElement('p', { className: "text-[13px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
                        , formatDateShort(p.startDate), " – "  , formatDateShort(p.endDate)
                      )
                    )
                    , React.createElement('div', { className: "flex items-center justify-between pt-3 border-t border-border-subtle/70"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}
                      , React.createElement('label', { className: "inline-flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}}
                        , React.createElement('input', {
                          type: "checkbox",
                          checked: p.isPublished,
                          disabled: !isOnline,
                          onChange: () => togglePromoPublished(p.id),
                          className: "w-4 h-4 accent-[#E58A33]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
                        ), "Terbit"

                      )
                      , React.createElement('div', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}
                        , React.createElement('button', {
                          type: "button",
                          disabled: !isOnline,
                          onClick: () => openEdit(p),
                          className: "w-9 h-9 rounded-[10px] flex items-center justify-center text-text-secondary hover:bg-bg-elevated cursor-pointer"        ,
                          'aria-label': "Ubah", __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}

                          , React.createElement(Pencil, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}} )
                        )
                        , React.createElement('button', {
                          type: "button",
                          disabled: !isOnline,
                          onClick: () => setDeleteTarget(p),
                          className: "w-9 h-9 rounded-[10px] flex items-center justify-center text-status-danger hover:bg-bg-elevated cursor-pointer"        ,
                          'aria-label': "Hapus", __self: this, __source: {fileName: _jsxFileName, lineNumber: 163}}

                          , React.createElement(Trash2, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}} )
                        )
                      )
                    )
                  )
                )
              );
            })
          )
        )
      )

      , React.createElement(AdminDrawerForm, {
        open: drawerOpen,
        onClose: () => setDrawerOpen(false),
        title: editingId ? 'Ubah Promo & Event' : 'Tambah Promo & Event',
        onSubmit: handleSubmit,
        disabled: !isOnline, __self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}

        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}, "Tipe")
          , React.createElement('div', { className: "grid grid-cols-2 gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}}
            , (['Promo', 'Event'] ).map((t) => (
              React.createElement('button', {
                key: t,
                type: "button",
                onClick: () => setType(t),
                className: `h-11 rounded-[10px] border text-[14px] font-semibold cursor-pointer ${
                  type === t
                    ? 'bg-accent-500/16 border-accent-500 text-accent-500'
                    : 'bg-bg-elevated border-border-subtle text-text-secondary'
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 193}}

                , t
              )
            ))
          )
        )
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 208}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 209}}, "Judul")
          , React.createElement('input', {
            type: "text",
            required: true,
            value: title,
            onChange: (e) => setTitle(e.target.value),
            className: "w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 210}}
          )
        )
        , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 218}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 219}}
            , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}}, "Tanggal mulai" )
            , React.createElement('input', {
              type: "date",
              required: true,
              value: startDate,
              onChange: (e) => setStartDate(e.target.value),
              className: "w-full h-12 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}}
            )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}
            , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 230}}, "Tanggal selesai" )
            , React.createElement('input', {
              type: "date",
              required: true,
              value: endDate,
              onChange: (e) => setEndDate(e.target.value),
              className: "w-full h-12 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}
            )
          )
        )
        , dateError && React.createElement('p', { className: "text-[13px] text-status-danger" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 240}}, dateError)
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 241}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 242}}, "Deskripsi & syarat"

          )
          , React.createElement('textarea', {
            rows: 5,
            required: true,
            value: description,
            onChange: (e) => setDescription(e.target.value),
            className: "w-full p-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 245}}
          )
        )
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 253}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 254}}, "URL Banner (16:10)"  )
          , React.createElement('input', {
            type: "url",
            value: image,
            onChange: (e) => setImage(e.target.value),
            className: "w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 255}}
          )
        )
        , React.createElement('label', { className: "flex items-center justify-between p-3 rounded-[12px] bg-bg-elevated cursor-pointer"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 262}}
          , React.createElement('span', { className: "text-[14px] text-text-primary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 263}}, "Terbitkan ke publik"  )
          , React.createElement('input', {
            type: "checkbox",
            checked: isPublished,
            onChange: (e) => setIsPublished(e.target.checked),
            className: "w-5 h-5 accent-[#E58A33]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 264}}
          )
        )
      )

      , React.createElement(ConfirmDialog, {
        open: Boolean(deleteTarget),
        title: `Hapus "${_optionalChain([deleteTarget, 'optionalAccess', _ => _.title])}"?`,
        description: "Promo atau event ini akan dihapus permanen."      ,
        confirmLabel: "Hapus",
        destructive: true,
        onCancel: () => setDeleteTarget(null),
        onConfirm: () => {
          if (deleteTarget) deletePromo(deleteTarget.id);
          setDeleteTarget(null);
        }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 273}}
      )
    )
  );
};
