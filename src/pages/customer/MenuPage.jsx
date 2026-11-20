const _jsxFileName = "src\\pages\\customer\\MenuPage.tsx";import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomerLayout } from '../../components/CustomerLayout';
import { MenuCard } from '../../components/CatalogCards';
import { BottomSheet, Button, EmptyState } from '../../components/ui';



export const MenuPage = () => {
  const { menuItems, categories, currentUser, userFavorites } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = searchParams.get('kategori') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    const catParam = searchParams.get('kategori');
    if (catParam) setSelectedCategory(catParam);
  }, [searchParams]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchInput.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  const filtered = useMemo(() => {
    const list = menuItems.filter((item) => {
      if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) return false;
      if (debouncedQuery && !item.name.toLowerCase().includes(debouncedQuery)) return false;
      if (onlyAvailable && !item.isAvailable) return false;
      if (onlyFavorites && currentUser && !userFavorites.menuIds.includes(item.id)) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      // Unavailable sorted after available
      if (a.isAvailable !== b.isAvailable) return a.isAvailable ? -1 : 1;
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return a.name.localeCompare(b.name, 'id');
    });
  }, [
    menuItems,
    selectedCategory,
    debouncedQuery,
    onlyAvailable,
    onlyFavorites,
    sortBy,
    currentUser,
    userFavorites.menuIds,
  ]);

  const visibleItems = filtered.slice(0, visibleCount);
  const activeFilterCount =
    (sortBy !== 'name' ? 1 : 0) + (onlyAvailable ? 1 : 0) + (onlyFavorites ? 1 : 0);

  const resetAll = () => {
    setSelectedCategory('all');
    setSearchInput('');
    setDebouncedQuery('');
    setSortBy('name');
    setOnlyAvailable(false);
    setOnlyFavorites(false);
    setSearchParams({});
  };

  return (
    React.createElement(CustomerLayout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}
      , React.createElement('div', { className: "max-w-[1120px] mx-auto px-4 sm:px-6 pt-5 space-y-5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}
        , React.createElement('div', { className: "flex items-center justify-between gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
          , React.createElement('h1', { className: "font-serif font-semibold text-[33px] leading-[40px] text-text-primary"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}, "Menu"

          )
          , React.createElement('button', {
            type: "button",
            onClick: () => setFilterOpen(true),
            className: "relative h-11 px-3.5 rounded-[12px] bg-bg-surface border border-border-subtle text-text-primary inline-flex items-center gap-2 text-[14px] font-medium hover:border-brown-300 cursor-pointer"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}

            , React.createElement(SlidersHorizontal, { className: "w-4 h-4 text-brown-300"  , strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}, "Filter")
            , activeFilterCount > 0 && (
              React.createElement('span', { className: "w-5 h-5 rounded-full bg-accent-500 text-on-accent text-[11px] font-bold flex items-center justify-center"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
                , activeFilterCount
              )
            )
          )
        )

        /* Search */
        , React.createElement('div', { className: "relative", __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
          , React.createElement(Search, {
            className: "w-5 h-5 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"       ,
            strokeWidth: 1.75, __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}}
          )
          , React.createElement('input', {
            type: "search",
            value: searchInput,
            onChange: (e) => setSearchInput(e.target.value),
            placeholder: "Cari kopi, matcha, atau pastry..."    ,
            className: "w-full h-12 pl-11 pr-10 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
          )
          , searchInput && (
            React.createElement('button', {
              type: "button",
              onClick: () => setSearchInput(''),
              'aria-label': "Hapus pencarian" ,
              className: "absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary cursor-pointer"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}

              , React.createElement(X, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}} )
            )
          )
        )

        /* Sticky Category Chips */
        , React.createElement('div', { className: "sticky top-14 lg:top-16 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-2 bg-bg-base/95 backdrop-blur-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}
          , React.createElement('div', { className: "flex items-center gap-2 overflow-x-auto no-scrollbar"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}
            , React.createElement('button', {
              type: "button",
              onClick: () => {
                setSelectedCategory('all');
                setSearchParams({});
              },
              className: `h-10 px-4 rounded-full text-[14px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-accent-500 text-on-accent font-semibold'
                  : 'bg-bg-surface border border-border-subtle text-text-secondary hover:text-text-primary'
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
, "Semua"

            )
            , categories.map((cat) => (
              React.createElement('button', {
                key: cat.id,
                type: "button",
                onClick: () => {
                  setSelectedCategory(cat.id);
                  setSearchParams({ kategori: cat.id });
                },
                className: `h-10 px-4 rounded-full text-[14px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-accent-500 text-on-accent font-semibold'
                    : 'bg-bg-surface border border-border-subtle text-text-secondary hover:text-text-primary'
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}

                , cat.name
              )
            ))
          )
        )

        /* Grid 2 cols mobile, 3 tablet, 4 desktop */
        , visibleItems.length === 0 ? (
          React.createElement(EmptyState, {
            icon: "search",
            title: "Menu tidak ditemukan"  ,
            description: "Coba ubah kata kunci pencarian atau atur ulang filter kategori."         ,
            actionLabel: "Reset filter" ,
            onAction: resetAll, __self: this, __source: {fileName: _jsxFileName, lineNumber: 162}}
          )
        ) : (
          React.createElement(React.Fragment, null
            , React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 171}}
              , visibleItems.map((item) => (
                React.createElement(MenuCard, { key: item.id, item: item, __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}} )
              ))
            )
            , filtered.length > visibleCount && (
              React.createElement('div', { className: "pt-2 flex justify-center"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}
                , React.createElement(Button, { variant: "secondary", onClick: () => setVisibleCount((c) => c + 20), __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}, "Muat lebih banyak ("
                     , filtered.length - visibleCount, " lagi)"
                )
              )
            )
          )
        )
      )

      /* Filter Bottom Sheet */
      , React.createElement(BottomSheet, { open: filterOpen, onClose: () => setFilterOpen(false), title: "Filter & Urutkan"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}
        , React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 189}}
          , React.createElement('div', { className: "space-y-2.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 190}}
            , React.createElement('div', { className: "text-[14px] font-semibold text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 191}}, "Urutkan")
            , React.createElement('div', { className: "grid grid-cols-1 gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 192}}
              , [
                { key: 'name' , label: 'Nama (A–Z)' },
                { key: 'price_asc' , label: 'Harga terendah' },
                { key: 'price_desc' , label: 'Harga tertinggi' },
              ].map((opt) => (
                React.createElement('button', {
                  key: opt.key,
                  type: "button",
                  onClick: () => setSortBy(opt.key),
                  className: `h-11 px-4 rounded-[12px] border text-left text-[14px] font-medium cursor-pointer transition-colors ${
                    sortBy === opt.key
                      ? 'bg-accent-500/16 border-accent-500 text-accent-500'
                      : 'bg-bg-surface border-border-subtle text-text-secondary'
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}

                  , opt.label
                )
              ))
            )
          )

          , React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 214}}
            , React.createElement('label', { className: "flex items-center justify-between p-3.5 rounded-[12px] bg-bg-surface border border-border-subtle cursor-pointer"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 215}}
              , React.createElement('span', { className: "text-[14px] font-medium text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 216}}, "Hanya yang tersedia"

              )
              , React.createElement('input', {
                type: "checkbox",
                checked: onlyAvailable,
                onChange: (e) => setOnlyAvailable(e.target.checked),
                className: "w-5 h-5 accent-[#E58A33]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 219}}
              )
            )
            , currentUser && (
              React.createElement('label', { className: "flex items-center justify-between p-3.5 rounded-[12px] bg-bg-surface border border-border-subtle cursor-pointer"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 227}}
                , React.createElement('span', { className: "text-[14px] font-medium text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 228}}, "Favorit saya" )
                , React.createElement('input', {
                  type: "checkbox",
                  checked: onlyFavorites,
                  onChange: (e) => setOnlyFavorites(e.target.checked),
                  className: "w-5 h-5 accent-[#E58A33]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}
                )
              )
            )
          )

          , React.createElement('div', { className: "flex gap-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 239}}
            , React.createElement(Button, {
              variant: "secondary",
              fullWidth: true,
              onClick: () => {
                resetAll();
                setFilterOpen(false);
              }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 240}}
, "Reset"

            )
            , React.createElement(Button, { fullWidth: true, onClick: () => setFilterOpen(false), __self: this, __source: {fileName: _jsxFileName, lineNumber: 250}}, "Terapkan"

            )
          )
        )
      )
    )
  );
};
