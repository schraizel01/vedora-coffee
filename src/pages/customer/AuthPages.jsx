const _jsxFileName = "src\\pages\\customer\\AuthPages.tsx";
function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined;
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}
import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/Logo';
import { Button } from '../../components/ui';

export const LoginPage = () => {
  const { currentUser, login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (currentUser) {
    return React.createElement(Navigate, {
      to: currentUser.role === 'admin' ? '/admin' : '/',
      replace: true,
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 20 },
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      const res = await login(email, password);
      if (!res.ok) {
        setError(res.error || 'Gagal masuk');
        return;
      }
      if (
        _optionalChain([res, 'access', (_) => _.user, 'optionalAccess', (_2) => _2.role]) ===
        'admin'
      ) {
        navigate('/admin', { replace: true });
      } else {
        navigate(state.from || '/', { replace: true });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return React.createElement(
    'div',
    {
      className: 'min-h-screen bg-bg-base flex flex-col items-center justify-center px-4 py-10',
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 39 },
    },
    React.createElement(
      'div',
      {
        className: 'w-full max-w-sm space-y-6',
        __self: this,
        __source: { fileName: _jsxFileName, lineNumber: 40 },
      },
      React.createElement(
        'div',
        {
          className: 'flex justify-center',
          __self: this,
          __source: { fileName: _jsxFileName, lineNumber: 41 },
        },
        React.createElement(
          Link,
          { to: '/', __self: this, __source: { fileName: _jsxFileName, lineNumber: 42 } },
          React.createElement(Logo, {
            variant: 'stacked',
            size: 'lg',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 43 },
          })
        )
      ),

      React.createElement(
        'div',
        {
          className: 'bg-bg-surface border border-border-subtle rounded-[16px] p-6 space-y-5',
          __self: this,
          __source: { fileName: _jsxFileName, lineNumber: 47 },
        },
        React.createElement(
          'div',
          {
            className: 'text-center space-y-1',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 48 },
          },
          React.createElement(
            'h1',
            {
              className: 'font-serif font-semibold text-[26px] leading-[34px] text-text-primary',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 49 },
            },
            'Selamat Datang Kembali'
          ),
          state.contextMessage &&
            React.createElement(
              'p',
              {
                className: 'text-[14px] text-accent-200 font-medium',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 53 },
              },
              state.contextMessage
            )
        ),

        error &&
          React.createElement(
            'div',
            {
              className: 'p-3 rounded-[12px] bg-status-danger/16 text-status-danger text-[13px]',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 58 },
            },
            error
          ),

        React.createElement(
          'form',
          {
            onSubmit: handleSubmit,
            className: 'space-y-4',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 63 },
          },
          React.createElement(
            'div',
            { __self: this, __source: { fileName: _jsxFileName, lineNumber: 64 } },
            React.createElement(
              'label',
              {
                className: 'block text-[13px] text-text-secondary mb-1.5',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 65 },
              },
              'Email'
            ),
            React.createElement('input', {
              type: 'email',
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: 'nama@email.com',
              className:
                'w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 66 },
            })
          ),

          React.createElement(
            'div',
            { __self: this, __source: { fileName: _jsxFileName, lineNumber: 76 } },
            React.createElement(
              'label',
              {
                className: 'block text-[13px] text-text-secondary mb-1.5',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 77 },
              },
              'Kata sandi'
            ),
            React.createElement(
              'div',
              {
                className: 'relative',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 78 },
              },
              React.createElement('input', {
                type: showPass ? 'text' : 'password',
                required: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: 'Minimal 8 karakter',
                className:
                  'w-full h-12 pl-4 pr-12 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 79 },
              }),
              React.createElement(
                'button',
                {
                  type: 'button',
                  onClick: () => setShowPass((s) => !s),
                  'aria-label': showPass ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi',
                  className:
                    'absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 87 },
                },
                showPass
                  ? React.createElement(EyeOff, {
                      className: 'w-5 h-5',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 93 },
                    })
                  : React.createElement(Eye, {
                      className: 'w-5 h-5',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 93 },
                    })
              )
            )
          ),

          React.createElement(
            Button,
            {
              type: 'submit',
              fullWidth: true,
              disabled: submitting,
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 98 },
            },
            submitting ? 'Memproses...' : 'Masuk'
          )
        ),

        /* Quick Demo Account Pills */
        React.createElement(
          'div',
          {
            className: 'pt-3 border-t border-border-subtle space-y-2',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 104 },
          },
          React.createElement(
            'div',
            {
              className: 'text-[12px] text-text-muted text-center',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 105 },
            },
            'Akun demo cepat'
          ),
          React.createElement(
            'div',
            {
              className: 'grid grid-cols-2 gap-2',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 106 },
            },
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: () => {
                  setEmail('customer@vedora.id');
                  setPassword('password123');
                },
                className:
                  'h-9 px-3 rounded-[10px] bg-bg-elevated border border-border-subtle text-[12px] font-medium text-text-secondary hover:text-text-primary cursor-pointer',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 107 },
              },
              'Customer (Nadia)'
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: () => {
                  setEmail('admin@vedora.id');
                  setPassword('admin123');
                },
                className:
                  'h-9 px-3 rounded-[10px] bg-bg-elevated border border-border-subtle text-[12px] font-medium text-accent-200 hover:border-accent-500 cursor-pointer',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 117 },
              },
              'Admin Vedora'
            )
          )
        ),

        React.createElement(
          'div',
          {
            className: 'text-center text-[14px] text-text-secondary space-y-2 pt-1',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 130 },
          },
          React.createElement(
            'div',
            { __self: this, __source: { fileName: _jsxFileName, lineNumber: 131 } },
            'Belum punya akun?',
            ' ',
            React.createElement(
              Link,
              {
                to: '/daftar',
                state: { from: state.from },
                className: 'text-accent-500 font-semibold hover:underline',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 133 },
              },
              'Daftar'
            )
          ),
          React.createElement(
            'div',
            { __self: this, __source: { fileName: _jsxFileName, lineNumber: 141 } },
            React.createElement(
              Link,
              {
                to: '/',
                className: 'text-text-muted hover:text-text-primary text-[13px]',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 142 },
              },
              'Lanjut sebagai tamu'
            )
          )
        )
      )
    )
  );
};

export const RegisterPage = () => {
  const { currentUser, register } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (currentUser) {
    return React.createElement(Navigate, {
      to: currentUser.role === 'admin' ? '/admin' : '/',
      replace: true,
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 169 },
    });
  }

  const emailError =
    touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Format email tidak valid' : '';
  const phoneError =
    touched.phone && !/^\d{9,14}$/.test(phone.replace(/\D/g, ''))
      ? 'Nomor HP harus 9–14 digit angka'
      : '';
  const passError =
    touched.password && password.length < 8 ? 'Kata sandi minimal 8 karakter' : '';
  const confirmError =
    touched.confirmPassword && confirmPassword !== password ? 'Kata sandi tidak cocok' : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setTouched({ email: true, phone: true, password: true, confirmPassword: true });
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !/^\d{9,14}$/.test(phone.replace(/\D/g, '')) ||
      password.length < 8 ||
      confirmPassword !== password
    ) {
      return;
    }
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await register({ name, email, phone: phone.replace(/\D/g, ''), password });
      if (!res.ok) {
        setSubmitError(res.error || 'Gagal mendaftar');
        return;
      }
      navigate(state.from || '/', { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return React.createElement(
    'div',
    {
      className: 'min-h-screen bg-bg-base flex flex-col items-center justify-center px-4 py-10',
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 204 },
    },
    React.createElement(
      'div',
      {
        className: 'w-full max-w-sm space-y-6',
        __self: this,
        __source: { fileName: _jsxFileName, lineNumber: 205 },
      },
      React.createElement(
        'div',
        {
          className: 'flex justify-center',
          __self: this,
          __source: { fileName: _jsxFileName, lineNumber: 206 },
        },
        React.createElement(
          Link,
          { to: '/', __self: this, __source: { fileName: _jsxFileName, lineNumber: 207 } },
          React.createElement(Logo, {
            variant: 'stacked',
            size: 'lg',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 208 },
          })
        )
      ),

      React.createElement(
        'div',
        {
          className: 'bg-bg-surface border border-border-subtle rounded-[16px] p-6 space-y-5',
          __self: this,
          __source: { fileName: _jsxFileName, lineNumber: 212 },
        },
        React.createElement(
          'h1',
          {
            className:
              'font-serif font-semibold text-[26px] leading-[34px] text-text-primary text-center',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 213 },
          },
          'Buat Akun'
        ),

        submitError &&
          React.createElement(
            'div',
            {
              className: 'p-3 rounded-[12px] bg-status-danger/16 text-status-danger text-[13px]',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 218 },
            },
            submitError
          ),

        React.createElement(
          'form',
          {
            onSubmit: handleSubmit,
            className: 'space-y-4',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 223 },
          },
          React.createElement(
            'div',
            { __self: this, __source: { fileName: _jsxFileName, lineNumber: 224 } },
            React.createElement(
              'label',
              {
                className: 'block text-[13px] text-text-secondary mb-1.5',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 225 },
              },
              'Nama lengkap'
            ),
            React.createElement('input', {
              type: 'text',
              required: true,
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: 'Nama panggilan atau lengkap',
              className:
                'w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 226 },
            })
          ),

          React.createElement(
            'div',
            { __self: this, __source: { fileName: _jsxFileName, lineNumber: 236 } },
            React.createElement(
              'label',
              {
                className: 'block text-[13px] text-text-secondary mb-1.5',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 237 },
              },
              'Email'
            ),
            React.createElement('input', {
              type: 'email',
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              onBlur: () => setTouched((t) => ({ ...t, email: true })),
              placeholder: 'nama@email.com',
              className:
                'w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 238 },
            }),
            emailError &&
              React.createElement(
                'p',
                {
                  className: 'text-[12px] text-status-danger mt-1',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 247 },
                },
                emailError
              )
          ),

          React.createElement(
            'div',
            { __self: this, __source: { fileName: _jsxFileName, lineNumber: 250 } },
            React.createElement(
              'label',
              {
                className: 'block text-[13px] text-text-secondary mb-1.5',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 251 },
              },
              'Nomor HP'
            ),
            React.createElement('input', {
              type: 'tel',
              required: true,
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              onBlur: () => setTouched((t) => ({ ...t, phone: true })),
              placeholder: '081234567890',
              className:
                'w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 252 },
            }),
            phoneError &&
              React.createElement(
                'p',
                {
                  className: 'text-[12px] text-status-danger mt-1',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 261 },
                },
                phoneError
              )
          ),

          React.createElement(
            'div',
            { __self: this, __source: { fileName: _jsxFileName, lineNumber: 264 } },
            React.createElement(
              'label',
              {
                className: 'block text-[13px] text-text-secondary mb-1.5',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 265 },
              },
              'Kata sandi'
            ),
            React.createElement(
              'div',
              {
                className: 'relative',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 266 },
              },
              React.createElement('input', {
                type: showPass ? 'text' : 'password',
                required: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
                onBlur: () => setTouched((t) => ({ ...t, password: true })),
                placeholder: 'Minimal 8 karakter',
                className:
                  'w-full h-12 pl-4 pr-12 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 267 },
              }),
              React.createElement(
                'button',
                {
                  type: 'button',
                  onClick: () => setShowPass((s) => !s),
                  className:
                    'absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-text-secondary cursor-pointer',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 276 },
                },
                showPass
                  ? React.createElement(EyeOff, {
                      className: 'w-5 h-5',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 281 },
                    })
                  : React.createElement(Eye, {
                      className: 'w-5 h-5',
                      __self: this,
                      __source: { fileName: _jsxFileName, lineNumber: 281 },
                    })
              )
            ),
            passError &&
              React.createElement(
                'p',
                {
                  className: 'text-[12px] text-status-danger mt-1',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 284 },
                },
                passError
              )
          ),

          React.createElement(
            'div',
            { __self: this, __source: { fileName: _jsxFileName, lineNumber: 287 } },
            React.createElement(
              'label',
              {
                className: 'block text-[13px] text-text-secondary mb-1.5',
                __self: this,
                __source: { fileName: _jsxFileName, lineNumber: 288 },
              },
              'Konfirmasi kata sandi'
            ),
            React.createElement('input', {
              type: showPass ? 'text' : 'password',
              required: true,
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
              onBlur: () => setTouched((t) => ({ ...t, confirmPassword: true })),
              placeholder: 'Ulangi kata sandi',
              className:
                'w-full h-12 px-4 rounded-[12px] bg-bg-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 291 },
            }),
            confirmError &&
              React.createElement(
                'p',
                {
                  className: 'text-[12px] text-status-danger mt-1',
                  __self: this,
                  __source: { fileName: _jsxFileName, lineNumber: 301 },
                },
                confirmError
              )
          ),

          React.createElement(
            Button,
            {
              type: 'submit',
              fullWidth: true,
              disabled: submitting,
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 305 },
            },
            submitting ? 'Mendaftarkan...' : 'Daftar'
          )
        ),

        React.createElement(
          'div',
          {
            className: 'text-center text-[14px] text-text-secondary pt-1',
            __self: this,
            __source: { fileName: _jsxFileName, lineNumber: 310 },
          },
          'Sudah punya akun?',
          ' ',
          React.createElement(
            Link,
            {
              to: '/masuk',
              className: 'text-accent-500 font-semibold hover:underline',
              __self: this,
              __source: { fileName: _jsxFileName, lineNumber: 312 },
            },
            'Masuk'
          )
        )
      )
    )
  );
};