const _jsxFileName = "src\\pages\\admin\\AdminCatsPage.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

import { formatCatAge, getTodayISO, slugify } from '../../utils/format';
import { AdminLayout } from '../../components/AdminLayout';
import { AdminDrawerForm } from '../../components/AdminDrawerForm';
import { Button, ConfirmDialog, EmptyState, LazyImage } from '../../components/ui';

const DEFAULT_CAT_IMAGE =
  'https://images.unsplash.com/photo-1758471021176-0b9fb22bf6e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900';

export const AdminCatsPage = () => {
  const { cats, isOnline, saveCat, deleteCat, updateCatStatus, toggleCatFeatured } = useApp();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(undefined);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('Betina');
  const [birthDate, setBirthDate] = useState('2024-01-01');
  const [traits, setTraits] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(DEFAULT_CAT_IMAGE);
  const [status, setStatus] = useState('active');
  const [isFeatured, setIsFeatured] = useState(false);

  const today = getTodayISO();

  const openNew = () => {
    setEditingId(undefined);
    setName('');
    setBreed('');
    setGender('Betina');
    setBirthDate('2024-01-01');
    setTraits('');
    setDescription('');
    setImage(DEFAULT_CAT_IMAGE);
    setStatus('active');
    setIsFeatured(false);
    setDrawerOpen(true);
  };

  const openEdit = (cat) => {
    setEditingId(cat.id);
    setName(cat.name);
    setBreed(cat.breed);
    setGender(cat.gender);
    setBirthDate(cat.birthDate);
    setTraits(cat.traits);
    setDescription(cat.description);
    setImage(cat.image);
    setStatus(cat.status);
    setIsFeatured(cat.isFeatured);
    setDrawerOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCat({
      id: editingId,
      slug: slugify(name) || 'kucing-' + Date.now(),
      name: name.trim(),
      breed: breed.trim(),
      gender,
      birthDate,
      traits: traits.trim(),
      description: description.trim(),
      image: image.trim() || DEFAULT_CAT_IMAGE,
      status,
      isFeatured,
    });
    setDrawerOpen(false);
  };

  const filtered = useMemo(() => {
    return cats.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (
        query.trim() &&
        !c.name.toLowerCase().includes(query.trim().toLowerCase()) &&
        !c.breed.toLowerCase().includes(query.trim().toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [cats, statusFilter, query]);

  return (
    React.createElement(AdminLayout, {
      title: "Kelola Kucing" ,
      action: 
        React.createElement(Button, { size: "sm", disabled: !isOnline, onClick: openNew, __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}
          , React.createElement(Plus, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}} ), "Tambah Kucing"

        )
      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}

      , React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}
        , React.createElement('div', { className: "flex flex-col sm:flex-row gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
          , React.createElement('div', { className: "relative flex-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}
            , React.createElement(Search, { className: "w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 106}} )
            , React.createElement('input', {
              type: "search",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: "Cari nama atau ras kucing..."    ,
              className: "w-full h-11 pl-10 pr-4 rounded-[12px] bg-bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
            )
          )
          , React.createElement('select', {
            value: statusFilter,
            onChange: (e) => setStatusFilter(e.target.value ),
            className: "h-11 px-3.5 rounded-[12px] bg-bg-surface border border-border-subtle text-text-primary"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}

            , React.createElement('option', { value: "all", __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}, "Semua status" )
            , React.createElement('option', { value: "active", __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}, "Siap bermain" )
            , React.createElement('option', { value: "resting", __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}, "Sedang istirahat" )
            , React.createElement('option', { value: "adopted", __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}, "Sudah diadopsi" )
          )
        )

        , filtered.length === 0 ? (
          React.createElement(EmptyState, { icon: "cat", title: "Tidak ada profil kucing"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}} )
        ) : (
          React.createElement(React.Fragment, null
            /* Desktop Table */
            , React.createElement('div', { className: "hidden lg:block bg-bg-surface border border-border-subtle rounded-[16px] overflow-hidden"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}
              , React.createElement('table', { className: "w-full text-left text-[14px]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}
                , React.createElement('thead', { className: "border-b border-border-subtle text-text-secondary text-[13px]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}
                  , React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}
                    , React.createElement('th', { className: "py-3.5 px-4 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}, "Kucing")
                    , React.createElement('th', { className: "py-3.5 px-4 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}, "Ras & Umur"  )
                    , React.createElement('th', { className: "py-3.5 px-4 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}, "Status")
                    , React.createElement('th', { className: "py-3.5 px-4 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}, "Unggulan")
                    , React.createElement('th', { className: "py-3.5 px-4 font-medium text-right"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}, "Aksi")
                  )
                )
                , React.createElement('tbody', { className: "divide-y divide-border-subtle/70" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}}
                  , filtered.map((cat) => (
                    React.createElement('tr', { key: cat.id, className: "hover:bg-bg-elevated/40", __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}}
                      , React.createElement('td', { className: "py-3 px-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}}
                        , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 147}}
                          , React.createElement(LazyImage, {
                            src: cat.image,
                            alt: cat.name,
                            aspectClass: "aspect-[4/5]",
                            className: "w-11 rounded-[10px] shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
                          )
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
                            , React.createElement('div', { className: "font-serif font-semibold text-[16px] text-text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}
                              , cat.name
                            )
                            , React.createElement('div', { className: "text-[12px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}, cat.gender)
                          )
                        )
                      )
                      , React.createElement('td', { className: "py-3 px-4 text-text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}
                        , cat.breed, " · "  , formatCatAge(cat.birthDate)
                      )
                      , React.createElement('td', { className: "py-3 px-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}
                        , React.createElement('select', {
                          value: cat.status,
                          disabled: !isOnline,
                          onChange: (e) => updateCatStatus(cat.id, e.target.value ),
                          className: "h-9 px-3 rounded-[10px] bg-bg-elevated border border-border-subtle text-[13px] text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 166}}

                          , React.createElement('option', { value: "active", __self: this, __source: {fileName: _jsxFileName, lineNumber: 172}}, "Aktif")
                          , React.createElement('option', { value: "resting", __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}}, "Istirahat")
                          , React.createElement('option', { value: "adopted", __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}, "Diadopsi")
                        )
                      )
                      , React.createElement('td', { className: "py-3 px-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}
                        , React.createElement('input', {
                          type: "checkbox",
                          checked: cat.isFeatured,
                          disabled: !isOnline,
                          onChange: () => toggleCatFeatured(cat.id),
                          className: "w-5 h-5 accent-[#E58A33] cursor-pointer"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}
                        )
                      )
                      , React.createElement('td', { className: "py-3 px-4 text-right"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}}
                        , React.createElement('div', { className: "inline-flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 187}}
                          , React.createElement('button', {
                            type: "button",
                            disabled: !isOnline,
                            onClick: () => openEdit(cat),
                            className: "w-9 h-9 rounded-[10px] inline-flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-elevated cursor-pointer"         ,
                            'aria-label': "Ubah", __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}

                            , React.createElement(Pencil, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 195}} )
                          )
                          , React.createElement('button', {
                            type: "button",
                            disabled: !isOnline,
                            onClick: () => setDeleteTarget(cat),
                            className: "w-9 h-9 rounded-[10px] inline-flex items-center justify-center text-status-danger hover:bg-bg-elevated cursor-pointer"        ,
                            'aria-label': "Hapus", __self: this, __source: {fileName: _jsxFileName, lineNumber: 197}}

                            , React.createElement(Trash2, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 204}} )
                          )
                        )
                      )
                    )
                  ))
                )
              )
            )

            /* Mobile Cards */
            , React.createElement('div', { className: "lg:hidden space-y-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}}
              , filtered.map((cat) => (
                React.createElement('div', {
                  key: cat.id,
                  className: "bg-bg-surface border border-border-subtle rounded-[16px] p-3.5 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}}

                  , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}}
                    , React.createElement(LazyImage, {
                      src: cat.image,
                      alt: cat.name,
                      aspectClass: "aspect-[4/5]",
                      className: "w-14 rounded-[12px] shrink-0"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 222}}
                    )
                    , React.createElement('div', { className: "min-w-0 flex-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 228}}
                      , React.createElement('div', { className: "font-serif font-semibold text-[18px] text-text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}
                        , cat.name
                      )
                      , React.createElement('div', { className: "text-[13px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 232}}
                        , cat.breed, " · "  , formatCatAge(cat.birthDate)
                      )
                    )
                  )
                  , React.createElement('div', { className: "flex items-center justify-between gap-2 pt-2.5 border-t border-border-subtle/70"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 237}}
                    , React.createElement('select', {
                      value: cat.status,
                      disabled: !isOnline,
                      onChange: (e) => updateCatStatus(cat.id, e.target.value ),
                      className: "h-9 px-3 rounded-[10px] bg-bg-elevated border border-border-subtle text-[13px] text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 238}}

                      , React.createElement('option', { value: "active", __self: this, __source: {fileName: _jsxFileName, lineNumber: 244}}, "Aktif")
                      , React.createElement('option', { value: "resting", __self: this, __source: {fileName: _jsxFileName, lineNumber: 245}}, "Istirahat")
                      , React.createElement('option', { value: "adopted", __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}, "Diadopsi")
                    )
                    , React.createElement('div', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 248}}
                      , React.createElement('button', {
                        type: "button",
                        disabled: !isOnline,
                        onClick: () => openEdit(cat),
                        className: "w-9 h-9 rounded-[10px] flex items-center justify-center text-text-secondary hover:bg-bg-elevated cursor-pointer"        ,
                        'aria-label': "Ubah", __self: this, __source: {fileName: _jsxFileName, lineNumber: 249}}

                        , React.createElement(Pencil, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 256}} )
                      )
                      , React.createElement('button', {
                        type: "button",
                        disabled: !isOnline,
                        onClick: () => setDeleteTarget(cat),
                        className: "w-9 h-9 rounded-[10px] flex items-center justify-center text-status-danger hover:bg-bg-elevated cursor-pointer"        ,
                        'aria-label': "Hapus", __self: this, __source: {fileName: _jsxFileName, lineNumber: 258}}

                        , React.createElement(Trash2, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 265}} )
                      )
                    )
                  )
                )
              ))
            )
          )
        )
      )

      , React.createElement(AdminDrawerForm, {
        open: drawerOpen,
        onClose: () => setDrawerOpen(false),
        title: editingId ? 'Ubah Profil Kucing' : 'Tambah Kucing',
        onSubmit: handleSubmit,
        disabled: !isOnline, __self: this, __source: {fileName: _jsxFileName, lineNumber: 276}}

        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 283}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 284}}, "Nama kucing" )
          , React.createElement('input', {
            type: "text",
            required: true,
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 285}}
          )
        )
        , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 293}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 294}}
            , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 295}}, "Ras")
            , React.createElement('input', {
              type: "text",
              required: true,
              value: breed,
              onChange: (e) => setBreed(e.target.value),
              placeholder: "Mis. British Shorthair"  ,
              className: "w-full h-12 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 296}}
            )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 305}}
            , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 306}}, "Jenis kelamin" )
            , React.createElement('select', {
              value: gender,
              onChange: (e) => setGender(e.target.value ),
              className: "w-full h-12 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 307}}

              , React.createElement('option', { value: "Betina", __self: this, __source: {fileName: _jsxFileName, lineNumber: 312}}, "Betina")
              , React.createElement('option', { value: "Jantan", __self: this, __source: {fileName: _jsxFileName, lineNumber: 313}}, "Jantan")
            )
          )
        )
        , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 317}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 318}}
            , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 319}}, "Tanggal lahir" )
            , React.createElement('input', {
              type: "date",
              max: today,
              required: true,
              value: birthDate,
              onChange: (e) => setBirthDate(e.target.value),
              className: "w-full h-12 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 320}}
            )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 329}}
            , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 330}}, "Status")
            , React.createElement('select', {
              value: status,
              onChange: (e) => setStatus(e.target.value ),
              className: "w-full h-12 px-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 331}}

              , React.createElement('option', { value: "active", __self: this, __source: {fileName: _jsxFileName, lineNumber: 336}}, "Siap bermain" )
              , React.createElement('option', { value: "resting", __self: this, __source: {fileName: _jsxFileName, lineNumber: 337}}, "Sedang istirahat" )
              , React.createElement('option', { value: "adopted", __self: this, __source: {fileName: _jsxFileName, lineNumber: 338}}, "Sudah diadopsi" )
            )
          )
        )
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 342}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 343}}, "Sifat (pisah dengan koma)"

          )
          , React.createElement('input', {
            type: "text",
            value: traits,
            onChange: (e) => setTraits(e.target.value),
            placeholder: "Mis. Manja, Tenang, Suka Dipeluk"    ,
            className: "w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 346}}
          )
        )
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 354}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 355}}, "Cerita singkat" )
          , React.createElement('textarea', {
            rows: 3,
            required: true,
            value: description,
            onChange: (e) => setDescription(e.target.value),
            className: "w-full p-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 356}}
          )
        )
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 364}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 365}}, "URL Foto (4:5)"  )
          , React.createElement('input', {
            type: "url",
            value: image,
            onChange: (e) => setImage(e.target.value),
            className: "w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 366}}
          )
        )
        , React.createElement('label', { className: "flex items-center justify-between p-3 rounded-[12px] bg-bg-elevated cursor-pointer"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 373}}
          , React.createElement('span', { className: "text-[14px] text-text-primary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 374}}, "Tampilkan di Beranda"  )
          , React.createElement('input', {
            type: "checkbox",
            checked: isFeatured,
            onChange: (e) => setIsFeatured(e.target.checked),
            className: "w-5 h-5 accent-[#E58A33]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 375}}
          )
        )
      )

      , React.createElement(ConfirmDialog, {
        open: Boolean(deleteTarget),
        title: `Hapus ${_optionalChain([deleteTarget, 'optionalAccess', _ => _.name])}?`,
        description: "Data kucing akan dihapus permanen."    ,
        confirmLabel: "Hapus",
        destructive: true,
        onCancel: () => setDeleteTarget(null),
        onConfirm: () => {
          if (deleteTarget) deleteCat(deleteTarget.id);
          setDeleteTarget(null);
        }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 384}}
      )
    )
  );
};
