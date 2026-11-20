const _jsxFileName = "src\\pages\\admin\\AdminMenuPage.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

import { formatRupiah, slugify } from '../../utils/format';
import { AdminLayout } from '../../components/AdminLayout';
import { AdminDrawerForm } from '../../components/AdminDrawerForm';
import { Badge, Button, ConfirmDialog, EmptyState, LazyImage } from '../../components/ui';

const DEFAULT_MENU_IMAGE =
  'https://images.unsplash.com/photo-1763473821509-9a383b480844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900';

export const AdminMenuPage = () => {
  const {
    menuItems,
    categories,
    isOnline,
    saveMenuItem,
    deleteMenuItem,
    toggleMenuField,
    saveCategory,
    deleteCategory,
    moveCategoryOrder,
  } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tab, setTab] = useState('menu');
  const [query, setQuery] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [availFilter, setAvailFilter] = useState('all');

  // Menu form drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(undefined);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(_optionalChain([categories, 'access', _ => _[0], 'optionalAccess', _2 => _2.id]) || '');
  const [price, setPrice] = useState('30000');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(DEFAULT_MENU_IMAGE);
  const [badge, setBadge] = useState('none');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Category form state
  const [catNameInput, setCatNameInput] = useState('');
  const [editingCat, setEditingCat] = useState(null);
  const [catError, setCatError] = useState('');

  useEffect(() => {
    if (searchParams.get('new') === '1') {
      openNewMenuForm();
      setSearchParams({});
    }
  }, [searchParams]);

  const openNewMenuForm = () => {
    setEditingId(undefined);
    setName('');
    setCategoryId(_optionalChain([categories, 'access', _3 => _3[0], 'optionalAccess', _4 => _4.id]) || '');
    setPrice('30000');
    setDescription('');
    setImage(DEFAULT_MENU_IMAGE);
    setBadge('none');
    setIsFeatured(false);
    setIsAvailable(true);
    setDrawerOpen(true);
  };

  const openEditMenuForm = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setCategoryId(item.categoryId);
    setPrice(String(item.price));
    setDescription(item.description);
    setImage(item.image);
    setBadge(item.badge);
    setIsFeatured(item.isFeatured);
    setIsAvailable(item.isAvailable);
    setDrawerOpen(true);
  };

  const handleMenuSubmit = (e) => {
    e.preventDefault();
    const numericPrice = Math.max(0, Number(price) || 0);
    saveMenuItem({
      id: editingId,
      slug: slugify(name) || 'menu-' + Date.now(),
      name: name.trim(),
      categoryId,
      price: numericPrice,
      description: description.trim(),
      image: image.trim() || DEFAULT_MENU_IMAGE,
      badge,
      isFeatured,
      isAvailable,
    });
    setDrawerOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = _optionalChain([e, 'access', _5 => _5.target, 'access', _6 => _6.files, 'optionalAccess', _7 => _7[0]]);
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const filteredMenu = useMemo(() => {
    return menuItems.filter((m) => {
      if (catFilter !== 'all' && m.categoryId !== catFilter) return false;
      if (availFilter === 'available' && !m.isAvailable) return false;
      if (availFilter === 'out' && m.isAvailable) return false;
      if (query.trim() && !m.name.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [menuItems, catFilter, availFilter, query]);

  const getCategoryName = (id) => _optionalChain([categories, 'access', _8 => _8.find, 'call', _9 => _9((c) => c.id === id), 'optionalAccess', _10 => _10.name]) || '-';

  return (
    React.createElement(AdminLayout, {
      title: "Kelola Menu" ,
      action: 
        tab === 'menu' && (
          React.createElement(Button, {
            size: "sm",
            disabled: !isOnline || categories.length === 0,
            onClick: openNewMenuForm, __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}

            , React.createElement(Plus, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}} ), "Tambah Menu"

          )
        )
      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}

      , React.createElement('div', { className: "space-y-5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}
        /* Tabs Menu | Kategori */
        , React.createElement('div', { className: "inline-flex p-1 rounded-[12px] bg-bg-surface border border-border-subtle"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}}
          , React.createElement('button', {
            type: "button",
            onClick: () => setTab('menu'),
            className: `h-10 px-5 rounded-[10px] text-[14px] font-semibold cursor-pointer ${
              tab === 'menu' ? 'bg-accent-500 text-on-accent' : 'text-text-secondary'
            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
, "Menu ("
             , menuItems.length, ")"
          )
          , React.createElement('button', {
            type: "button",
            onClick: () => setTab('kategori'),
            className: `h-10 px-5 rounded-[10px] text-[14px] font-semibold cursor-pointer ${
              tab === 'kategori' ? 'bg-accent-500 text-on-accent' : 'text-text-secondary'
            }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}
, "Kategori ("
             , categories.length, ")"
          )
        )

        , tab === 'menu' ? (
          React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}
            /* Filters */
            , React.createElement('div', { className: "flex flex-col sm:flex-row gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}}
              , React.createElement('div', { className: "relative flex-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}
                , React.createElement(Search, { className: "w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}} )
                , React.createElement('input', {
                  type: "search",
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  placeholder: "Cari nama menu..."  ,
                  className: "w-full h-11 pl-10 pr-4 rounded-[12px] bg-bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}
                )
              )
              , React.createElement('select', {
                value: catFilter,
                onChange: (e) => setCatFilter(e.target.value),
                className: "h-11 px-3.5 rounded-[12px] bg-bg-surface border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}

                , React.createElement('option', { value: "all", __self: this, __source: {fileName: _jsxFileName, lineNumber: 183}}, "Semua kategori" )
                , categories.map((c) => (
                  React.createElement('option', { key: c.id, value: c.id, __self: this, __source: {fileName: _jsxFileName, lineNumber: 185}}
                    , c.name
                  )
                ))
              )
              , React.createElement('select', {
                value: availFilter,
                onChange: (e) => setAvailFilter(e.target.value ),
                className: "h-11 px-3.5 rounded-[12px] bg-bg-surface border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}

                , React.createElement('option', { value: "all", __self: this, __source: {fileName: _jsxFileName, lineNumber: 195}}, "Semua status" )
                , React.createElement('option', { value: "available", __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}}, "Tersedia")
                , React.createElement('option', { value: "out", __self: this, __source: {fileName: _jsxFileName, lineNumber: 197}}, "Habis")
              )
            )

            , filteredMenu.length === 0 ? (
              React.createElement(EmptyState, { icon: "cup", title: "Belum ada menu sesuai filter"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}} )
            ) : (
              React.createElement(React.Fragment, null
                /* Desktop Table */
                , React.createElement('div', { className: "hidden lg:block bg-bg-surface border border-border-subtle rounded-[16px] overflow-hidden"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 206}}
                  , React.createElement('table', { className: "w-full text-left text-[14px]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 207}}
                    , React.createElement('thead', { className: "border-b border-border-subtle text-text-secondary text-[13px]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 208}}
                      , React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 209}}
                        , React.createElement('th', { className: "py-3.5 px-4 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 210}}, "Menu")
                        , React.createElement('th', { className: "py-3.5 px-4 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 211}}, "Kategori")
                        , React.createElement('th', { className: "py-3.5 px-4 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 212}}, "Harga")
                        , React.createElement('th', { className: "py-3.5 px-4 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 213}}, "Tersedia")
                        , React.createElement('th', { className: "py-3.5 px-4 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 214}}, "Unggulan")
                        , React.createElement('th', { className: "py-3.5 px-4 font-medium text-right"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}}, "Aksi")
                      )
                    )
                    , React.createElement('tbody', { className: "divide-y divide-border-subtle/70" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 218}}
                      , filteredMenu.map((item) => (
                        React.createElement('tr', { key: item.id, className: "hover:bg-bg-elevated/40", __self: this, __source: {fileName: _jsxFileName, lineNumber: 220}}
                          , React.createElement('td', { className: "py-3 px-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 221}}
                            , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 222}}
                              , React.createElement(LazyImage, {
                                src: item.image,
                                alt: item.name,
                                className: "w-12 h-12 rounded-[10px] shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 223}}
                              )
                              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 228}}
                                , React.createElement('div', { className: "font-semibold text-text-primary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}, item.name)
                                , item.badge !== 'none' && (
                                  React.createElement(Badge, {
                                    tone: item.badge === 'Best Seller' ? 'accent' : 'info',
                                    className: "mt-0.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}

                                    , item.badge
                                  )
                                )
                              )
                            )
                          )
                          , React.createElement('td', { className: "py-3 px-4 text-text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 241}}
                            , getCategoryName(item.categoryId)
                          )
                          , React.createElement('td', { className: "py-3 px-4 text-accent-500 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 244}}
                            , formatRupiah(item.price)
                          )
                          , React.createElement('td', { className: "py-3 px-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 247}}
                            , React.createElement('input', {
                              type: "checkbox",
                              checked: item.isAvailable,
                              disabled: !isOnline,
                              onChange: () => toggleMenuField(item.id, 'isAvailable'),
                              className: "w-5 h-5 accent-[#E58A33] cursor-pointer"   ,
                              'aria-label': `Tersedia ${item.name}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 248}}
                            )
                          )
                          , React.createElement('td', { className: "py-3 px-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 257}}
                            , React.createElement('input', {
                              type: "checkbox",
                              checked: item.isFeatured,
                              disabled: !isOnline,
                              onChange: () => toggleMenuField(item.id, 'isFeatured'),
                              className: "w-5 h-5 accent-[#E58A33] cursor-pointer"   ,
                              'aria-label': `Unggulan ${item.name}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 258}}
                            )
                          )
                          , React.createElement('td', { className: "py-3 px-4 text-right"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}
                            , React.createElement('div', { className: "inline-flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 268}}
                              , React.createElement('button', {
                                type: "button",
                                disabled: !isOnline,
                                onClick: () => openEditMenuForm(item),
                                className: "w-9 h-9 rounded-[10px] inline-flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-elevated cursor-pointer disabled:opacity-40"          ,
                                'aria-label': "Ubah", __self: this, __source: {fileName: _jsxFileName, lineNumber: 269}}

                                , React.createElement(Pencil, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 276}} )
                              )
                              , React.createElement('button', {
                                type: "button",
                                disabled: !isOnline,
                                onClick: () => setDeleteTarget(item),
                                className: "w-9 h-9 rounded-[10px] inline-flex items-center justify-center text-text-secondary hover:text-status-danger hover:bg-bg-elevated cursor-pointer disabled:opacity-40"          ,
                                'aria-label': "Hapus", __self: this, __source: {fileName: _jsxFileName, lineNumber: 278}}

                                , React.createElement(Trash2, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 285}} )
                              )
                            )
                          )
                        )
                      ))
                    )
                  )
                )

                /* Mobile Cards */
                , React.createElement('div', { className: "lg:hidden space-y-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 296}}
                  , filteredMenu.map((item) => (
                    React.createElement('div', {
                      key: item.id,
                      className: "bg-bg-surface border border-border-subtle rounded-[16px] p-3.5 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 298}}

                      , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 302}}
                        , React.createElement(LazyImage, {
                          src: item.image,
                          alt: item.name,
                          className: "w-16 h-16 rounded-[12px] shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 303}}
                        )
                        , React.createElement('div', { className: "min-w-0 flex-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 308}}
                          , React.createElement('div', { className: "font-semibold text-[15px] text-text-primary truncate"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 309}}
                            , item.name
                          )
                          , React.createElement('div', { className: "text-[12px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 312}}
                            , getCategoryName(item.categoryId)
                          )
                          , React.createElement('div', { className: "text-[14px] font-semibold text-accent-500 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 315}}
                            , formatRupiah(item.price)
                          )
                        )
                      )
                      , React.createElement('div', { className: "flex items-center justify-between pt-2.5 border-t border-border-subtle/70"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 320}}
                        , React.createElement('div', { className: "flex items-center gap-4 text-[13px] text-text-secondary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 321}}
                          , React.createElement('label', { className: "inline-flex items-center gap-1.5 cursor-pointer"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 322}}
                            , React.createElement('input', {
                              type: "checkbox",
                              checked: item.isAvailable,
                              disabled: !isOnline,
                              onChange: () => toggleMenuField(item.id, 'isAvailable'),
                              className: "w-4 h-4 accent-[#E58A33]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 323}}
                            ), "Tersedia"

                          )
                          , React.createElement('label', { className: "inline-flex items-center gap-1.5 cursor-pointer"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 332}}
                            , React.createElement('input', {
                              type: "checkbox",
                              checked: item.isFeatured,
                              disabled: !isOnline,
                              onChange: () => toggleMenuField(item.id, 'isFeatured'),
                              className: "w-4 h-4 accent-[#E58A33]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 333}}
                            ), "Unggulan"

                          )
                        )
                        , React.createElement('div', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 343}}
                          , React.createElement('button', {
                            type: "button",
                            disabled: !isOnline,
                            onClick: () => openEditMenuForm(item),
                            className: "w-9 h-9 rounded-[10px] flex items-center justify-center text-text-secondary hover:bg-bg-elevated cursor-pointer"        ,
                            'aria-label': "Ubah", __self: this, __source: {fileName: _jsxFileName, lineNumber: 344}}

                            , React.createElement(Pencil, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 351}} )
                          )
                          , React.createElement('button', {
                            type: "button",
                            disabled: !isOnline,
                            onClick: () => setDeleteTarget(item),
                            className: "w-9 h-9 rounded-[10px] flex items-center justify-center text-status-danger hover:bg-bg-elevated cursor-pointer"        ,
                            'aria-label': "Hapus", __self: this, __source: {fileName: _jsxFileName, lineNumber: 353}}

                            , React.createElement(Trash2, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 360}} )
                          )
                        )
                      )
                    )
                  ))
                )
              )
            )
          )
        ) : (
          /* TAB KATEGORI */
          React.createElement('div', { className: "max-w-xl space-y-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 372}}
            , React.createElement('form', {
              onSubmit: (e) => {
                e.preventDefault();
                if (!catNameInput.trim()) return;
                setCatError('');
                const res = saveCategory({
                  id: _optionalChain([editingCat, 'optionalAccess', _11 => _11.id]),
                  name: catNameInput,
                  sortOrder: _optionalChain([editingCat, 'optionalAccess', _12 => _12.sortOrder]) || categories.length + 1,
                });
                if (!res.ok) {
                  setCatError(res.error || 'Gagal menyimpan');
                  return;
                }
                setCatNameInput('');
                setEditingCat(null);
              },
              className: "flex gap-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 373}}

              , React.createElement('input', {
                type: "text",
                value: catNameInput,
                onChange: (e) => setCatNameInput(e.target.value),
                placeholder: editingCat ? 'Ubah nama kategori...' : 'Nama kategori baru...',
                className: "flex-1 h-12 px-4 rounded-[12px] bg-bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 392}}
              )
              , React.createElement(Button, { type: "submit", disabled: !isOnline || !catNameInput.trim(), __self: this, __source: {fileName: _jsxFileName, lineNumber: 399}}
                , editingCat ? 'Simpan' : 'Tambah'
              )
              , editingCat && (
                React.createElement(Button, {
                  type: "button",
                  variant: "secondary",
                  onClick: () => {
                    setEditingCat(null);
                    setCatNameInput('');
                  }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 403}}
, "Batal"

                )
              )
            )
            , catError && React.createElement('p', { className: "text-[13px] text-status-danger" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 415}}, catError)

            , React.createElement('div', { className: "bg-bg-surface border border-border-subtle rounded-[16px] divide-y divide-border-subtle/70"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 417}}
              , categories.map((cat, idx) => {
                const count = menuItems.filter((m) => m.categoryId === cat.id).length;
                return (
                  React.createElement('div', { key: cat.id, className: "p-3.5 flex items-center justify-between gap-3"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 421}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 422}}
                      , React.createElement('div', { className: "font-semibold text-[15px] text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 423}}, cat.name)
                      , React.createElement('div', { className: "text-[12px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 424}}, count, " menu" )
                    )
                    , React.createElement('div', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 426}}
                      , React.createElement('button', {
                        type: "button",
                        disabled: !isOnline || idx === 0,
                        onClick: () => moveCategoryOrder(cat.id, 'up'),
                        className: "w-9 h-9 rounded-[10px] flex items-center justify-center text-text-secondary hover:bg-bg-elevated disabled:opacity-30 cursor-pointer"         ,
                        'aria-label': "Naikkan urutan" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 427}}

                        , React.createElement(ArrowUp, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 434}} )
                      )
                      , React.createElement('button', {
                        type: "button",
                        disabled: !isOnline || idx === categories.length - 1,
                        onClick: () => moveCategoryOrder(cat.id, 'down'),
                        className: "w-9 h-9 rounded-[10px] flex items-center justify-center text-text-secondary hover:bg-bg-elevated disabled:opacity-30 cursor-pointer"         ,
                        'aria-label': "Turunkan urutan" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 436}}

                        , React.createElement(ArrowDown, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 443}} )
                      )
                      , React.createElement('button', {
                        type: "button",
                        disabled: !isOnline,
                        onClick: () => {
                          setEditingCat(cat);
                          setCatNameInput(cat.name);
                        },
                        className: "w-9 h-9 rounded-[10px] flex items-center justify-center text-text-secondary hover:bg-bg-elevated cursor-pointer"        ,
                        'aria-label': "Ubah kategori" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 445}}

                        , React.createElement(Pencil, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 455}} )
                      )
                      , React.createElement('button', {
                        type: "button",
                        disabled: !isOnline,
                        onClick: () => deleteCategory(cat.id),
                        className: "w-9 h-9 rounded-[10px] flex items-center justify-center text-status-danger hover:bg-bg-elevated cursor-pointer"        ,
                        'aria-label': "Hapus kategori" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 457}}

                        , React.createElement(Trash2, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 464}} )
                      )
                    )
                  )
                );
              })
            )
          )
        )
      )

      /* Add/Edit Menu Drawer */
      , React.createElement(AdminDrawerForm, {
        open: drawerOpen,
        onClose: () => setDrawerOpen(false),
        title: editingId ? 'Ubah Menu' : 'Tambah Menu',
        onSubmit: handleMenuSubmit,
        disabled: !isOnline, __self: this, __source: {fileName: _jsxFileName, lineNumber: 476}}

        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 483}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 484}}, "Nama menu" )
          , React.createElement('input', {
            type: "text",
            required: true,
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 485}}
          )
          , React.createElement('p', { className: "text-[12px] text-text-muted mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 492}}, "Slug: " , slugify(name) || '-')
        )

        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 495}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 496}}, "Kategori")
          , React.createElement('select', {
            value: categoryId,
            onChange: (e) => setCategoryId(e.target.value),
            className: "w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 497}}

            , categories.map((c) => (
              React.createElement('option', { key: c.id, value: c.id, __self: this, __source: {fileName: _jsxFileName, lineNumber: 503}}
                , c.name
              )
            ))
          )
        )

        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 510}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 511}}, "Harga")
          , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 512}}
            , React.createElement('span', { className: "absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 513}}, "Rp"

            )
            , React.createElement('input', {
              type: "number",
              min: 0,
              required: true,
              value: price,
              onChange: (e) => setPrice(e.target.value),
              className: "w-full h-12 pl-11 pr-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 516}}
            )
          )
        )

        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 527}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 528}}, "Deskripsi")
          , React.createElement('textarea', {
            rows: 3,
            required: true,
            value: description,
            onChange: (e) => setDescription(e.target.value),
            className: "w-full p-3.5 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary focus:outline-none focus:border-accent-500"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 529}}
          )
        )

        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 538}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 539}}, "Foto (1:1)" )
          , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 540}}
            , React.createElement(LazyImage, { src: image, alt: "Preview", className: "w-20 h-20 rounded-[12px] shrink-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 541}} )
            , React.createElement('div', { className: "flex-1 space-y-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 542}}
              , React.createElement('input', {
                type: "url",
                value: image,
                onChange: (e) => setImage(e.target.value),
                placeholder: "URL gambar..." ,
                className: "w-full h-10 px-3 rounded-[10px] bg-bg-elevated border border-border-subtle text-[13px] text-text-primary"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 543}}
              )
              , React.createElement('input', {
                type: "file",
                accept: "image/png,image/jpeg,image/webp",
                onChange: handleImageUpload,
                className: "block text-[12px] text-text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 550}}
              )
            )
          )
        )

        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 560}}
          , React.createElement('label', { className: "block text-[13px] text-text-secondary mb-1.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 561}}, "Badge")
          , React.createElement('div', { className: "grid grid-cols-3 gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 562}}
            , (['none', 'Best Seller', 'Baru'] ).map((b) => (
              React.createElement('button', {
                key: b,
                type: "button",
                onClick: () => setBadge(b),
                className: `h-10 rounded-[10px] border text-[13px] font-medium cursor-pointer ${
                  badge === b
                    ? 'bg-accent-500/16 border-accent-500 text-accent-500'
                    : 'bg-bg-elevated border-border-subtle text-text-secondary'
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 564}}

                , b === 'none' ? 'Tanpa' : b
              )
            ))
          )
        )

        , React.createElement('div', { className: "space-y-2.5 pt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 580}}
          , React.createElement('label', { className: "flex items-center justify-between p-3 rounded-[12px] bg-bg-elevated cursor-pointer"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 581}}
            , React.createElement('span', { className: "text-[14px] text-text-primary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 582}}, "Tersedia")
            , React.createElement('input', {
              type: "checkbox",
              checked: isAvailable,
              onChange: (e) => setIsAvailable(e.target.checked),
              className: "w-5 h-5 accent-[#E58A33]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 583}}
            )
          )
          , React.createElement('label', { className: "flex items-center justify-between p-3 rounded-[12px] bg-bg-elevated cursor-pointer"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 590}}
            , React.createElement('span', { className: "text-[14px] text-text-primary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 591}}, "Tampilkan di Menu Unggulan"   )
            , React.createElement('input', {
              type: "checkbox",
              checked: isFeatured,
              onChange: (e) => setIsFeatured(e.target.checked),
              className: "w-5 h-5 accent-[#E58A33]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 592}}
            )
          )
        )
      )

      , React.createElement(ConfirmDialog, {
        open: Boolean(deleteTarget),
        title: `Hapus ${_optionalChain([deleteTarget, 'optionalAccess', _13 => _13.name])}?`,
        description: "Menu yang dihapus tidak akan tampil lagi di katalog."        ,
        confirmLabel: "Hapus",
        destructive: true,
        onCancel: () => setDeleteTarget(null),
        onConfirm: () => {
          if (deleteTarget) deleteMenuItem(deleteTarget.id);
          setDeleteTarget(null);
        }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 602}}
      )
    )
  );
};
