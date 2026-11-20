const _jsxFileName = "src\\pages\\admin\\AdminReviewsPage.tsx";import React, { useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

import { formatDateFull } from '../../utils/format';
import { AdminLayout } from '../../components/AdminLayout';
import { Button, EmptyState, StarRating } from '../../components/ui';

export const AdminReviewsPage = () => {
  const { reviews, isOnline, updateReviewStatus } = useApp();
  const [tab, setTab] = useState('pending');

  const counts = useMemo(
    () => ({
      pending: reviews.filter((r) => r.status === 'pending').length,
      approved: reviews.filter((r) => r.status === 'approved').length,
      rejected: reviews.filter((r) => r.status === 'rejected').length,
    }),
    [reviews]
  );

  const approvedList = reviews.filter((r) => r.status === 'approved');
  const avgRating =
    approvedList.length > 0
      ? (approvedList.reduce((s, r) => s + r.rating, 0) / approvedList.length).toFixed(1)
      : '0.0';

  const shown = reviews.filter((r) => r.status === tab);

  return (
    React.createElement(AdminLayout, { title: "Moderasi Ulasan" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}
      , React.createElement('div', { className: "space-y-5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
        /* Summary */
        , React.createElement('div', { className: "bg-bg-surface border border-border-subtle rounded-[16px] p-4 flex items-center justify-between"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}
          , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
            , React.createElement('div', { className: "w-11 h-11 rounded-[12px] bg-accent-500/16 text-accent-200 flex items-center justify-center"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}
              , React.createElement(Star, { className: "w-5 h-5 fill-accent-200"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}} )
            )
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}
              , React.createElement('div', { className: "text-[13px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}, "Rating rata-rata (disetujui)"  )
              , React.createElement('div', { className: "text-[20px] font-semibold text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
                , avgRating, " " , React.createElement('span', { className: "text-[13px] text-text-muted" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}, "/ 5.0" )
              )
            )
          )
          , React.createElement('div', { className: "text-[13px] text-text-secondary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}, counts.approved, " ulasan tampil"  )
        )

        /* Tabs */
        , React.createElement('div', { className: "inline-flex p-1 rounded-[12px] bg-bg-surface border border-border-subtle"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}
          , [
            { key: 'pending' , label: `Menunggu (${counts.pending})` },
            { key: 'approved' , label: `Disetujui (${counts.approved})` },
            { key: 'rejected' , label: `Ditolak (${counts.rejected})` },
          ].map((t) => (
            React.createElement('button', {
              key: t.key,
              type: "button",
              onClick: () => setTab(t.key),
              className: `h-10 px-4 rounded-[10px] text-[13px] sm:text-[14px] font-semibold cursor-pointer ${
                tab === t.key ? 'bg-accent-500 text-on-accent' : 'text-text-secondary'
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}

              , t.label
            )
          ))
        )

        , shown.length === 0 ? (
          React.createElement(EmptyState, {
            icon: "cup",
            title: 
              tab === 'pending'
                ? 'Tidak ada ulasan yang menunggu moderasi'
                : 'Belum ada ulasan di tab ini'
            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}}
          )
        ) : (
          React.createElement('div', { className: "space-y-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
            , shown.map((rev) => (
              React.createElement('div', {
                key: rev.id,
                className: "bg-bg-surface border border-border-subtle rounded-[16px] p-4 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}

                , React.createElement('div', { className: "flex flex-wrap items-center justify-between gap-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}
                    , React.createElement('div', { className: "font-semibold text-[15px] text-text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}
                      , rev.authorName
                    )
                    , React.createElement('div', { className: "text-[12px] text-text-muted" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
                      , formatDateFull(rev.createdAt)
                    )
                  )
                  , React.createElement(StarRating, { value: rev.rating, size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}} )
                )

                , React.createElement('p', { className: "text-[14px] leading-[22px] text-text-secondary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}, rev.comment)

                , React.createElement('div', { className: "flex gap-2.5 pt-2 border-t border-border-subtle/70"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
                  , rev.status === 'pending' && (
                    React.createElement(React.Fragment, null
                      , React.createElement(Button, {
                        size: "sm",
                        variant: "destructive",
                        disabled: !isOnline,
                        onClick: () => updateReviewStatus(rev.id, 'rejected'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}
, "Tolak"

                      )
                      , React.createElement(Button, {
                        size: "sm",
                        disabled: !isOnline,
                        onClick: () => updateReviewStatus(rev.id, 'approved'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
, "Setujui"

                      )
                    )
                  )
                  , rev.status === 'approved' && (
                    React.createElement(Button, {
                      size: "sm",
                      variant: "secondary",
                      disabled: !isOnline,
                      onClick: () => updateReviewStatus(rev.id, 'rejected'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
, "Sembunyikan"

                    )
                  )
                  , rev.status === 'rejected' && (
                    React.createElement(Button, {
                      size: "sm",
                      disabled: !isOnline,
                      onClick: () => updateReviewStatus(rev.id, 'approved'), __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}
, "Setujui"

                    )
                  )
                )
              )
            ))
          )
        )
      )
    )
  );
};
