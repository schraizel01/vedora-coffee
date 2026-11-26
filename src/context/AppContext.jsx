import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { timeToMinutes, getTodayISO, minutesToColonTime } from '../utils/format';

const CACHE_KEY = 'vedora_coffee_cache_v1';
const OFFLINE_RES_KEY = 'vedora_offline_reservations_v1';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const DAY_NAMES_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const DEFAULT_CAFE = {
  id: 1,
  name: 'Vedora Coffee',
  tagline: 'Cat, Coffee & Eatery',
  description: '',
  address: '',
  latitude: -6.9932,
  longitude: 110.4203,
  phone: '',
  whatsapp: '',
  instagram: '',
  email: 'halo@vedoracoffee.id',
  aboutImageUrl: '',
  aboutImage: '',
  heroUrl: '',
  heroImage: '',
  maxCapacity: 30,
  slotMinutes: 60,
  bookingDurationMinutes: 120,
  durationMinutes: 120,
  tableDurationMinutes: 120,
  reservationDurationMinutes: 120,
  operatingHours: [],
};

function makeSlug(text) {
  const base = (text || 'item')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return `${base}-${Math.random().toString(36).slice(2, 6)}`;
}

async function resolveImageUrl(input, folder = 'uploads') {
  if (!input) return null;
  if (typeof input === 'string') {
    const trimmed = input.trim();
    return trimmed || null;
  }
  if (input instanceof File || input instanceof Blob) {
    const ext = input.name ? input.name.split('.').pop() : 'jpg';
    const filePath = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const { error } = await supabase.storage.from('vedora-assets').upload(filePath, input, {
      upsert: true,
    });
    if (error) throw error;
    const { data } = supabase.storage.from('vedora-assets').getPublicUrl(filePath);
    return data.publicUrl;
  }
  return null;
}

const mapCategory = (r) => ({
  id: r.id,
  name: r.name,
  slug: r.slug,
  sortOrder: r.sort_order,
});

const mapMenu = (r) => ({
  id: r.id,
  categoryId: r.category_id,
  name: r.name,
  slug: r.slug,
  description: r.description || '',
  price: r.price,
  imageUrl: r.image_url || '',
  image: r.image_url || '',
  photoUrl: r.image_url || '',
  isAvailable: r.is_available,
  isFeatured: r.is_featured,
  badge: r.badge || undefined,
});

const mapCat = (r) => ({
  id: r.id,
  name: r.name,
  slug: r.slug,
  breed: r.breed || '',
  gender: r.gender || 'Jantan',
  birthDate: r.birth_date || '',
  personality: r.personality || '',
  description: r.description || '',
  photoUrl: r.photo_url || '',
  imageUrl: r.photo_url || '',
  image: r.photo_url || '',
  status: r.status || 'active',
  isFeatured: r.is_featured,
});

const mapPromo = (r) => ({
  id: r.id,
  title: r.title,
  slug: r.slug,
  type: r.type,
  description: r.description || '',
  imageUrl: r.image_url || '',
  image: r.image_url || '',
  bannerUrl: r.image_url || '',
  startDate: r.start_date,
  endDate: r.end_date,
  isPublished: r.is_published,
});

const mapReservation = (r) => ({
  id: r.id,
  code: r.code,
  userId: r.user_id,
  customerName: r.contact_name,
  customerPhone: r.contact_phone,
  date: r.reservation_date,
  startTime: (r.reservation_time || '').slice(0, 5),
  endTime: (r.end_time || '').slice(0, 5),
  guests: r.guest_count,
  notes: r.notes || undefined,
  status: r.status,
  processedBy: r.handler?.name || undefined,
  createdAt: r.created_at,
  isOffline: false,
});

const mapReview = (r) => ({
  id: r.id,
  userId: r.user_id,
  authorName: r.author?.name || 'Pengunjung Vedora',
  rating: r.rating,
  comment: r.comment,
  status: r.status,
  createdAt: (r.created_at || '').slice(0, 10),
});

function loadCachedState() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return null;
}

function loadOfflineReservations() {
  try {
    const raw = localStorage.getItem(OFFLINE_RES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // ignore
  }
  return [];
}

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const cached = loadCachedState();

  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [cafeInfo, setCafeInfo] = useState(cached?.cafeInfo || DEFAULT_CAFE);
  const [categories, setCategories] = useState(cached?.categories || []);
  const [menuItems, setMenuItems] = useState(cached?.menuItems || []);
  const [cats, setCats] = useState(cached?.cats || []);
  const [promos, setPromos] = useState(cached?.promos || []);
  const [dbReservations, setDbReservations] = useState([]);
  const [offlineReservations, setOfflineReservations] = useState(loadOfflineReservations);
  const [reviews, setReviews] = useState(cached?.reviews || []);
  const [userFavorites, setUserFavorites] = useState({ menuIds: [], catIds: [] });
  const [loading, setLoading] = useState(true);

  const [browserOnline, setBrowserOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [simulatedOffline, setSimulatedOffline] = useState(false);
  const [justReconnected, setJustReconnected] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [loginPromptMessage, setLoginPromptMessage] = useState(null);
  const [installBannerDismissed, setInstallBannerDismissed] = useState(false);

  const syncingRef = useRef(false);
  const isOnline = browserOnline && !simulatedOffline;

  // Gabungan reservasi database + reservasi sementara offline
  const reservations = [...offlineReservations, ...dbReservations];

  useEffect(() => {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ cafeInfo, categories, menuItems, cats, promos, reviews })
      );
    } catch (e) {
      // ignore
    }
  }, [cafeInfo, categories, menuItems, cats, promos, reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(OFFLINE_RES_KEY, JSON.stringify(offlineReservations));
    } catch (e) {
      // ignore
    }
  }, [offlineReservations]);

  // Sinkronisasi antar tab jika dibuka bersamaan
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === OFFLINE_RES_KEY) {
        setOfflineReservations(loadOfflineReservations());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setBrowserOnline(true);
      setJustReconnected(true);
      setTimeout(() => setJustReconnected(false), 2200);
    };
    const handleOffline = () => setBrowserOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleSimulatedOffline = () => {
    setSimulatedOffline((prev) => {
      const next = !prev;
      if (!next) {
        setJustReconnected(true);
        setTimeout(() => setJustReconnected(false), 2200);
      }
      return next;
    });
  };

  const showToast = useCallback((message, type = 'info', actionLabel, onAction) => {
    const id = 't-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type, actionLabel, onAction }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3400);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const requireOnline = () => {
    if (!isOnline) {
      showToast('Kamu sedang offline. Aksi ini butuh koneksi internet.', 'warning');
      return false;
    }
    return true;
  };

  const refreshAllData = useCallback(async (authUser = null) => {
    try {
      const response = await fetch(`${API_URL}/api/catalog`);
      if (!response.ok) {
        throw new Error('Gagal mengambil data dari Vedora REST API');
      }
      const catalog = await response.json();

      if (catalog.cafeInfo) {
        const c = catalog.cafeInfo;
        const hrs = (catalog.openingHours || []).map((h) => ({
          id: h.id,
          dayIndex: h.day_of_week,
          dayOfWeek: h.day_of_week,
          dayName: DAY_NAMES_ID[h.day_of_week] || '',
          openTime: (h.open_time || '10:00').slice(0, 5),
          closeTime: (h.close_time || '22:00').slice(0, 5),
          isClosed: h.is_closed,
        }));
        const heroImg =
          c.hero_url || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600';
        const aboutImg = c.about_image_url || heroImg;
        const duration = Number(c.booking_duration_minutes) || 120;
        setCafeInfo({
          id: c.id,
          name: c.name,
          tagline: c.tagline || '',
          description: c.description || '',
          address: c.address || '',
          latitude: Number(c.latitude || 0),
          longitude: Number(c.longitude || 0),
          phone: c.phone || '',
          whatsapp: c.whatsapp || '',
          instagram: c.instagram || '',
          email: c.email || 'halo@vedoracoffee.id',
          aboutImageUrl: c.about_image_url || '',
          aboutImage: aboutImg,
          heroUrl: heroImg,
          heroImage: heroImg,
          maxCapacity: Number(c.max_capacity) || 30,
          slotMinutes: Number(c.slot_minutes) || 60,
          bookingDurationMinutes: duration,
          durationMinutes: duration,
          tableDurationMinutes: duration,
          reservationDurationMinutes: duration,
          operatingHours: hrs,
        });
      }

      if (catalog.categories) setCategories(catalog.categories.map(mapCategory));
      if (catalog.menuItems) setMenuItems(catalog.menuItems.map(mapMenu));
      if (catalog.cats) setCats(catalog.cats.map(mapCat));
      if (catalog.promos) setPromos(catalog.promos.map(mapPromo));
      if (catalog.reviews) setReviews(catalog.reviews.map(mapReview));

      if (authUser) {
        const [profRes, resvRes, favMenuRes, favCatRes, myReviewsRes] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', authUser.id).single(),
          supabase
            .from('reservations')
            .select('*, handler:profiles!reservations_handled_by_fkey(name)')
            .order('reservation_date', { ascending: false })
            .order('reservation_time', { ascending: false }),
          supabase.from('favorite_menus').select('menu_item_id').eq('user_id', authUser.id),
          supabase.from('favorite_cats').select('cat_id').eq('user_id', authUser.id),
          supabase
            .from('reviews')
            .select('*, author:profiles!reviews_user_id_fkey(name)')
            .eq('user_id', authUser.id)
            .order('created_at', { ascending: false }),
        ]);

        if (myReviewsRes.data) {
          const userReviews = myReviewsRes.data.map(mapReview);
          setReviews((prev) => {
            const otherReviews = prev.filter((r) => r.userId !== authUser.id);
            return [...userReviews, ...otherReviews];
          });
        }

        if (profRes.data) {
          const p = profRes.data;
          setCurrentUser({
            id: p.id,
            name: p.name,
            email: authUser.email,
            phone: p.phone || '',
            role: p.role,
            active: p.is_active,
          });
          if (p.role === 'admin') {
            const allUsers = await supabase.from('profiles').select('*');
            if (allUsers.data) {
              setUsers(
                allUsers.data.map((u) => ({
                  id: u.id,
                  name: u.name,
                  phone: u.phone || '',
                  role: u.role,
                  active: u.is_active,
                }))
              );
            }
          }
        }

        if (resvRes.data) setDbReservations(resvRes.data.map(mapReservation));
        setUserFavorites({
          menuIds: (favMenuRes.data || []).map((f) => f.menu_item_id),
          catIds: (favCatRes.data || []).map((f) => f.cat_id),
        });
      } else {
        setCurrentUser(null);
        setDbReservations([]);
        setUserFavorites({ menuIds: [], catIds: [] });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      refreshAllData(session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      refreshAllData(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, [refreshAllData]);

  // ==================== AUTO-SYNC RESERVASI OFFLINE SAAT ONLINE ====================
  const syncOfflineReservations = useCallback(async () => {
    if (!isOnline || !currentUser || currentUser.role !== 'admin') return;
    if (syncingRef.current) return;

    const queue = loadOfflineReservations();
    if (queue.length === 0) return;

    syncingRef.current = true;
    try {
      const syncedIds = [];
      const insertedRows = [];

      for (const item of queue) {
        const payload = {
          code: item.code,
          user_id: currentUser.id, // Menggunakan ID Admin yang menyinkronkan
          contact_name: item.customerName,
          contact_phone: item.customerPhone,
          reservation_date: item.date,
          reservation_time: item.startTime,
          end_time: item.endTime,
          guest_count: Number(item.guests) || 1,
          notes: item.notes || 'Reservasi Offline (Walk-in)',
          status: item.status || 'pending',
          handled_by: item.status !== 'pending' ? currentUser.id : null,
        };

        const { data, error } = await supabase
          .from('reservations')
          .insert(payload)
          .select('*, handler:profiles!reservations_handled_by_fkey(name)')
          .single();

        if (!error && data) {
          syncedIds.push(item.id);
          insertedRows.push(mapReservation(data));
        }
      }

      if (syncedIds.length > 0) {
        setOfflineReservations((prev) => prev.filter((r) => !syncedIds.includes(r.id)));
        setDbReservations((prev) => [...insertedRows, ...prev]);
        showToast(
          `${syncedIds.length} reservasi offline berhasil disinkronkan ke database!`,
          'success'
        );
      }
    } finally {
      syncingRef.current = false;
    }
  }, [isOnline, currentUser, showToast]);

  useEffect(() => {
    if (isOnline && currentUser?.role === 'admin' && offlineReservations.length > 0) {
      syncOfflineReservations();
    }
  }, [isOnline, currentUser, offlineReservations.length, syncOfflineReservations]);

  // ==================== AUTH ====================
  const login = async (email, password) => {
    if (!requireOnline()) return { ok: false, error: 'Sedang offline' };
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) {
      return { ok: false, error: 'Email atau kata sandi salah' };
    }
    const { data: prof } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (prof && !prof.is_active) {
      await supabase.auth.signOut();
      return { ok: false, error: 'Akunmu dinonaktifkan. Hubungi kafe.' };
    }

    const mappedUser = {
      id: data.user.id,
      name: prof?.name || email.split('@')[0],
      email: data.user.email,
      phone: prof?.phone || '',
      role: prof?.role || 'customer',
      active: true,
    };
    setCurrentUser(mappedUser);
    return { ok: true, user: mappedUser };
  };

  const register = async (formData) => {
    if (!requireOnline()) return { ok: false, error: 'Sedang offline' };
    const { data, error } = await supabase.auth.signUp({
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      options: {
        data: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
        },
      },
    });
    if (error) {
      const msg = error.message.toLowerCase().includes('already')
        ? 'Email sudah terdaftar'
        : error.message;
      return { ok: false, error: msg };
    }
    const newUser = {
      id: data.user.id,
      name: formData.name.trim(),
      email: data.user.email,
      phone: formData.phone.trim(),
      role: 'customer',
      active: true,
    };
    setCurrentUser(newUser);
    return { ok: true, user: newUser };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    showToast('Kamu telah keluar dari akun', 'info');
  };

  const updateProfile = async (name, phone) => {
    if (!requireOnline() || !currentUser) return;
    const { error } = await supabase
      .from('profiles')
      .update({ name: name.trim(), phone: phone.trim() })
      .eq('id', currentUser.id);

    if (error) {
      showToast('Gagal memperbarui profil: ' + error.message, 'error');
      return;
    }
    setCurrentUser((prev) => ({ ...prev, name: name.trim(), phone: phone.trim() }));
    showToast('Profil berhasil disimpan', 'success');
  };

  // ==================== FAVORITES ====================
  const toggleFavoriteMenu = async (menuId) => {
    if (!currentUser) {
      setLoginPromptMessage('Masuk untuk menyimpan favorit');
      return;
    }
    if (!requireOnline()) return;
    const exists = userFavorites.menuIds.includes(menuId);
    if (exists) {
      await supabase
        .from('favorite_menus')
        .delete()
        .eq('user_id', currentUser.id)
        .eq('menu_item_id', menuId);
      setUserFavorites((prev) => ({
        ...prev,
        menuIds: prev.menuIds.filter((id) => id !== menuId),
      }));
      showToast('Dihapus dari favorit', 'info');
    } else {
      await supabase
        .from('favorite_menus')
        .insert({ user_id: currentUser.id, menu_item_id: menuId });
      setUserFavorites((prev) => ({
        ...prev,
        menuIds: [...prev.menuIds, menuId],
      }));
      showToast('Disimpan ke favorit', 'success');
    }
  };

  const toggleFavoriteCat = async (catId) => {
    if (!currentUser) {
      setLoginPromptMessage('Masuk untuk menyimpan favorit');
      return;
    }
    if (!requireOnline()) return;
    const exists = userFavorites.catIds.includes(catId);
    if (exists) {
      await supabase
        .from('favorite_cats')
        .delete()
        .eq('user_id', currentUser.id)
        .eq('cat_id', catId);
      setUserFavorites((prev) => ({
        ...prev,
        catIds: prev.catIds.filter((id) => id !== catId),
      }));
      showToast('Dihapus dari favorit', 'info');
    } else {
      await supabase
        .from('favorite_cats')
        .insert({ user_id: currentUser.id, cat_id: catId });
      setUserFavorites((prev) => ({
        ...prev,
        catIds: [...prev.catIds, catId],
      }));
      showToast('Disimpan ke favorit', 'success');
    }
  };

  // ==================== RESERVATIONS (ONLINE & OFFLINE GUEST) ====================
  const getSlotBookedGuests = (date, startTime, endTime) => {
    const slotStart = timeToMinutes(startTime);
    const slotEnd = timeToMinutes(endTime);
    return reservations
      .filter(
        (r) =>
          r.date === date &&
          (r.status === 'pending' || r.status === 'confirmed') &&
          timeToMinutes(r.startTime) < slotEnd &&
          timeToMinutes(r.endTime) > slotStart
      )
      .reduce((sum, r) => sum + r.guests, 0);
  };

  const createOfflineReservation = (customerName, customerPhone) => {
    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();
    const duration = Number(cafeInfo.bookingDurationMinutes) || 120;
    const startTime = minutesToColonTime(nowMins);
    const endTime = minutesToColonTime(Math.min(23 * 60 + 59, nowMins + duration));
    const randomCode = 'OFF-' + Math.random().toString(36).substring(2, 6).toUpperCase();

    const offlineTicket = {
      id: 'offline-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
      code: randomCode,
      userId: null,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      date: getTodayISO(),
      startTime,
      endTime,
      guests: 1,
      notes: 'Tiket Pemesanan Offline (Tanpa Login)',
      status: 'pending',
      createdAt: now.toISOString(),
      isOffline: true,
    };

    setOfflineReservations((prev) => [offlineTicket, ...prev]);
    return { ok: true, reservation: offlineTicket };
  };

  const createReservation = async (data) => {
    if (!requireOnline() || !currentUser) {
      return { ok: false, error: 'Butuh koneksi internet dan akun aktif' };
    }

    const { data: rpcRes, error } = await supabase.rpc('create_reservation_safe', {
      p_date: data.date,
      p_time: data.startTime,
      p_guests: Number(data.guests),
      p_name: data.customerName.trim(),
      p_phone: data.customerPhone.trim(),
      p_notes: data.notes?.trim() || null,
    });

    if (error) {
      return { ok: false, error: error.message };
    }
    if (!rpcRes?.ok) {
      return { ok: false, error: 'Jam ini baru saja penuh, pilih jam lain' };
    }

    const newRes = {
      id: rpcRes.id,
      code: rpcRes.code,
      userId: currentUser.id,
      customerName: data.customerName.trim(),
      customerPhone: data.customerPhone.trim(),
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      guests: Number(data.guests),
      notes: data.notes?.trim() || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
      isOffline: false,
    };
    setDbReservations((prev) => [newRes, ...prev]);
    return { ok: true, reservation: newRes };
  };

  const cancelMyReservation = async (id) => {
    if (String(id).startsWith('offline-')) {
      setOfflineReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' } : r))
      );
      showToast('Reservasi offline dibatalkan (lokal)', 'info');
      return;
    }
    if (!requireOnline()) return;
    const { error } = await supabase
      .from('reservations')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (error) {
      showToast('Gagal membatalkan reservasi', 'error');
      return;
    }
    setDbReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' } : r))
    );
    showToast('Reservasi berhasil dibatalkan', 'info');
  };

  // ==================== REVIEWS ====================
  const submitReview = async (rating, comment) => {
    if (!requireOnline() || !currentUser) {
      return { ok: false, error: 'Butuh koneksi internet dan akun aktif' };
    }
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        user_id: currentUser.id,
        rating: Number(rating),
        comment: comment.trim(),
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      showToast('Gagal mengirim ulasan: ' + error.message, 'error');
      return { ok: false, error: error.message };
    }

    const newReview = {
      id: data.id,
      userId: currentUser.id,
      authorName: currentUser.name,
      rating: data.rating,
      comment: data.comment,
      status: 'pending',
      createdAt: (data.created_at || new Date().toISOString()).slice(0, 10),
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Ulasan dikirim dan menunggu moderasi admin', 'success');
    return { ok: true, review: newReview };
  };

  // ==================== ADMIN: MENU & CATEGORIES ====================
  const saveMenuItem = async (item) => {
    if (!requireOnline()) return;
    try {
      const uploadedUrl = await resolveImageUrl(
        item.imageFile || item.file || item.imageUrl || item.image || item.photoUrl,
        'menus'
      );
      const payload = {
        category_id: Number(item.categoryId),
        name: item.name.trim(),
        description: item.description?.trim() || '',
        price: Number(item.price),
        image_url: uploadedUrl || '',
        is_available: Boolean(item.isAvailable),
        is_featured: Boolean(item.isFeatured),
        badge: item.badge || null,
      };

      if (item.id) {
        const { data, error } = await supabase
          .from('menu_items')
          .update(payload)
          .eq('id', item.id)
          .select()
          .single();
        if (error) throw error;
        setMenuItems((prev) => prev.map((m) => (m.id === item.id ? mapMenu(data) : m)));
        showToast('Menu berhasil diperbarui', 'success');
      } else {
        payload.slug = makeSlug(item.name);
        const { data, error } = await supabase
          .from('menu_items')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        setMenuItems((prev) => [mapMenu(data), ...prev]);
        showToast('Menu baru ditambahkan', 'success');
      }
    } catch (err) {
      showToast('Gagal menyimpan menu: ' + err.message, 'error');
    }
  };

  const deleteMenuItem = async (id) => {
    if (!requireOnline()) return;
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (error) {
      showToast('Gagal menghapus menu: ' + error.message, 'error');
      return;
    }
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
    showToast('Menu dihapus', 'info');
  };

  const toggleMenuField = async (id, field) => {
    if (!requireOnline()) return;
    const target = menuItems.find((m) => m.id === id);
    if (!target) return;
    const dbCol = field === 'isAvailable' ? 'is_available' : 'is_featured';
    const nextVal = !target[field];

    const { error } = await supabase
      .from('menu_items')
      .update({ [dbCol]: nextVal })
      .eq('id', id);

    if (error) {
      showToast('Gagal mengubah status menu', 'error');
      return;
    }
    setMenuItems((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: nextVal } : m)));
    showToast('Perubahan disimpan', 'success');
  };

  const saveCategory = async (cat) => {
    if (!requireOnline()) return { ok: false, error: 'Offline' };
    const duplicate = categories.some(
      (c) => c.name.toLowerCase() === cat.name.trim().toLowerCase() && c.id !== cat.id
    );
    if (duplicate) {
      return { ok: false, error: 'Nama kategori sudah digunakan' };
    }

    if (cat.id) {
      const { data, error } = await supabase
        .from('categories')
        .update({ name: cat.name.trim(), sort_order: Number(cat.sortOrder) })
        .eq('id', cat.id)
        .select()
        .single();
      if (error) return { ok: false, error: error.message };
      setCategories((prev) => prev.map((c) => (c.id === cat.id ? mapCategory(data) : c)));
      showToast('Kategori diperbarui', 'success');
    } else {
      const { data, error } = await supabase
        .from('categories')
        .insert({
          name: cat.name.trim(),
          slug: makeSlug(cat.name),
          sort_order: categories.length + 1,
        })
        .select()
        .single();
      if (error) return { ok: false, error: error.message };
      setCategories((prev) => [...prev, mapCategory(data)]);
      showToast('Kategori ditambahkan', 'success');
    }
    return { ok: true };
  };

  const deleteCategory = async (id) => {
    if (!requireOnline()) return { ok: false, error: 'Offline' };
    const usedCount = menuItems.filter((m) => m.categoryId === id).length;
    if (usedCount > 0) {
      const err = `Kategori masih dipakai ${usedCount} menu. Pindahkan menunya dulu.`;
      showToast(err, 'error');
      return { ok: false, error: err };
    }
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) return { ok: false, error: error.message };
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Kategori dihapus', 'info');
    return { ok: true };
  };

  const moveCategoryOrder = async (id, dir) => {
    if (!requireOnline()) return;
    const sorted = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = sorted.findIndex((c) => c.id === id);
    const targetIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (idx < 0 || targetIdx < 0 || targetIdx >= sorted.length) return;

    const temp = sorted[idx];
    sorted[idx] = sorted[targetIdx];
    sorted[targetIdx] = temp;
    const reindexed = sorted.map((c, i) => ({ ...c, sortOrder: i + 1 }));
    setCategories(reindexed);

    await Promise.all(
      reindexed.map((c) =>
        supabase.from('categories').update({ sort_order: c.sortOrder }).eq('id', c.id)
      )
    );
  };

  // ==================== ADMIN: CATS ====================
  const saveCat = async (cat) => {
    if (!requireOnline()) return;
    try {
      const uploadedUrl = await resolveImageUrl(
        cat.photoFile || cat.imageFile || cat.file || cat.photoUrl || cat.imageUrl || cat.image,
        'cats'
      );
      const payload = {
        name: cat.name.trim(),
        breed: cat.breed?.trim() || '',
        gender: cat.gender || 'Jantan',
        birth_date: cat.birthDate || null,
        personality: cat.personality?.trim() || '',
        description: cat.description?.trim() || '',
        photo_url: uploadedUrl || '',
        status: cat.status || 'active',
        is_featured: Boolean(cat.isFeatured),
      };

      if (cat.id) {
        const { data, error } = await supabase
          .from('cats')
          .update(payload)
          .eq('id', cat.id)
          .select()
          .single();
        if (error) throw error;
        setCats((prev) => prev.map((c) => (c.id === cat.id ? mapCat(data) : c)));
        showToast('Profil kucing diperbarui', 'success');
      } else {
        payload.slug = makeSlug(cat.name);
        const { data, error } = await supabase
          .from('cats')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        setCats((prev) => [mapCat(data), ...prev]);
        showToast('Kucing baru ditambahkan', 'success');
      }
    } catch (err) {
      showToast('Gagal menyimpan profil kucing: ' + err.message, 'error');
    }
  };

  const deleteCat = async (id) => {
    if (!requireOnline()) return;
    const { error } = await supabase.from('cats').delete().eq('id', id);
    if (error) {
      showToast('Gagal menghapus profil kucing', 'error');
      return;
    }
    setCats((prev) => prev.filter((c) => c.id !== id));
    showToast('Profil kucing dihapus', 'info');
  };

  const updateCatStatus = async (id, status) => {
    if (!requireOnline()) return;
    const { error } = await supabase.from('cats').update({ status }).eq('id', id);
    if (error) {
      showToast('Gagal memperbarui status kucing', 'error');
      return;
    }
    setCats((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    showToast('Status kucing diperbarui', 'success');
  };

  const toggleCatFeatured = async (id) => {
    if (!requireOnline()) return;
    const target = cats.find((c) => c.id === id);
    if (!target) return;
    const nextVal = !target.isFeatured;
    const { error } = await supabase
      .from('cats')
      .update({ is_featured: nextVal })
      .eq('id', id);
    if (error) return;
    setCats((prev) => prev.map((c) => (c.id === id ? { ...c, isFeatured: nextVal } : c)));
    showToast('Perubahan disimpan', 'success');
  };

  // ==================== ADMIN: PROMOS ====================
  const savePromo = async (promo) => {
    if (!requireOnline()) return;
    try {
      const uploadedUrl = await resolveImageUrl(
        promo.imageFile || promo.file || promo.imageUrl || promo.image || promo.bannerUrl,
        'promos'
      );
      const payload = {
        title: promo.title.trim(),
        type: promo.type || 'Promo',
        description: promo.description?.trim() || '',
        image_url: uploadedUrl || '',
        start_date: promo.startDate,
        end_date: promo.endDate,
        is_published: Boolean(promo.isPublished),
      };

      if (promo.id) {
        const { data, error } = await supabase
          .from('promos')
          .update(payload)
          .eq('id', promo.id)
          .select()
          .single();
        if (error) throw error;
        setPromos((prev) => prev.map((p) => (p.id === promo.id ? mapPromo(data) : p)));
        showToast('Promo & Event diperbarui', 'success');
      } else {
        payload.slug = makeSlug(promo.title);
        const { data, error } = await supabase
          .from('promos')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        setPromos((prev) => [mapPromo(data), ...prev]);
        showToast('Promo & Event ditambahkan', 'success');
      }
    } catch (err) {
      showToast('Gagal menyimpan promo: ' + err.message, 'error');
    }
  };

  const deletePromo = async (id) => {
    if (!requireOnline()) return;
    const { error } = await supabase.from('promos').delete().eq('id', id);
    if (error) {
      showToast('Gagal menghapus promo', 'error');
      return;
    }
    setPromos((prev) => prev.filter((p) => p.id !== id));
    showToast('Promo dihapus', 'info');
  };

  const togglePromoPublished = async (id) => {
    if (!requireOnline()) return;
    const target = promos.find((p) => p.id === id);
    if (!target) return;
    const nextVal = !target.isPublished;
    const { error } = await supabase
      .from('promos')
      .update({ is_published: nextVal })
      .eq('id', id);
    if (error) return;
    setPromos((prev) => prev.map((p) => (p.id === id ? { ...p, isPublished: nextVal } : p)));
    showToast('Status terbit diperbarui', 'success');
  };

  // ==================== ADMIN: RESERVATIONS (OFFLINE & ONLINE) & REVIEWS ====================
  const updateReservationStatus = async (id, status) => {
    // Jika tiket reservasi offline (penyimpanan sementara localStorage)
    if (String(id).startsWith('offline-')) {
      const existing = offlineReservations.find((r) => r.id === id);
      if (!existing) return { ok: false, error: 'Reservasi offline tidak ditemukan' };

      setOfflineReservations((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status, processedBy: currentUser?.name || 'Admin (Offline)' }
            : r
        )
      );

      if (isOnline && currentUser?.role === 'admin') {
        showToast('Status diubah, menyinkronkan ke database...', 'info');
      } else {
        showToast('Status disimpan sementara (akan masuk database saat online)', 'success');
      }
      return { ok: true };
    }

    if (!requireOnline()) return { ok: false, error: 'Offline' };
    const existing = dbReservations.find((r) => r.id === id);
    if (!existing) return { ok: false, error: 'Reservasi tidak ditemukan' };
    if (existing.status === 'cancelled' || existing.status === 'completed') {
      showToast('Status reservasi sudah berubah', 'warning');
      return { ok: false, error: 'Status reservasi sudah berubah' };
    }

    const { error } = await supabase
      .from('reservations')
      .update({ status, handled_by: currentUser?.id || null })
      .eq('id', id);

    if (error) {
      showToast('Gagal memperbarui status reservasi', 'error');
      return { ok: false, error: error.message };
    }
    setDbReservations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status, processedBy: currentUser?.name || 'Admin' } : r
      )
    );
    showToast('Status reservasi diperbarui', 'success');
    return { ok: true };
  };

  const updateReviewStatus = async (id, status) => {
    if (!requireOnline()) return;
    const { error } = await supabase
      .from('reviews')
      .update({ status, moderated_by: currentUser?.id || null })
      .eq('id', id);

    if (error) {
      showToast('Gagal memperbarui moderasi ulasan', 'error');
      return;
    }
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    showToast('Moderasi ulasan diperbarui', 'success');
  };

  // ==================== ADMIN: CAFE INFO ====================
  const saveCafeInfo = async (info) => {
    if (!requireOnline()) return;
    try {
      const aboutImageUrl = await resolveImageUrl(
        info.aboutImageFile || info.aboutImageUrl,
        'cafe'
      );
      const heroUrl = await resolveImageUrl(
        info.heroFile || info.heroImage || info.heroUrl,
        'cafe'
      );
      const duration = Number(
        info.bookingDurationMinutes ||
          info.durationMinutes ||
          info.tableDurationMinutes ||
          info.reservationDurationMinutes ||
          120
      );

      const { error } = await supabase
        .from('cafe_info')
        .update({
          name: info.name,
          tagline: info.tagline,
          description: info.description,
          address: info.address,
          latitude: Number(info.latitude),
          longitude: Number(info.longitude),
          phone: info.phone,
          whatsapp: info.whatsapp,
          instagram: info.instagram,
          about_image_url: aboutImageUrl || '',
          hero_url: heroUrl || '',
          max_capacity: Number(info.maxCapacity),
          slot_minutes: Number(info.slotMinutes),
          booking_duration_minutes: duration,
        })
        .eq('id', cafeInfo.id || 1);

      if (error) throw error;

      const scheduleList = info.operatingHours || info.hours;
      if (Array.isArray(scheduleList)) {
        await Promise.all(
          scheduleList.map((h) =>
            supabase
              .from('opening_hours')
              .update({
                open_time: h.openTime,
                close_time: h.closeTime,
                is_closed: h.isClosed,
              })
              .eq('day_of_week', h.dayIndex ?? h.dayOfWeek)
          )
        );
      }

      setCafeInfo({
        ...info,
        aboutImageUrl: aboutImageUrl || '',
        aboutImage: aboutImageUrl || heroUrl || '',
        heroUrl: heroUrl || '',
        heroImage: heroUrl || '',
        bookingDurationMinutes: duration,
        durationMinutes: duration,
        tableDurationMinutes: duration,
        reservationDurationMinutes: duration,
      });
      showToast('Pengaturan kafe disimpan', 'success');
    } catch (err) {
      showToast('Gagal menyimpan pengaturan kafe: ' + err.message, 'error');
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        currentUser,
        users,
        cafeInfo,
        categories: [...categories].sort((a, b) => a.sortOrder - b.sortOrder),
        menuItems,
        cats,
        promos,
        reservations,
        offlineReservationsCount: offlineReservations.length,
        reviews,
        userFavorites,
        isOnline,
        justReconnected,
        simulatedOffline,
        toggleSimulatedOffline,
        installBannerDismissed,
        dismissInstallBanner: () => setInstallBannerDismissed(true),
        toasts,
        showToast,
        dismissToast,
        loginPromptMessage,
        openLoginPrompt: (msg) => setLoginPromptMessage(msg),
        closeLoginPrompt: () => setLoginPromptMessage(null),
        login,
        register,
        logout,
        updateProfile,
        toggleFavoriteMenu,
        toggleFavoriteCat,
        getSlotBookedGuests,
        createReservation,
        createOfflineReservation,
        syncOfflineReservations,
        cancelMyReservation,
        submitReview,
        saveMenuItem,
        deleteMenuItem,
        toggleMenuField,
        saveCategory,
        deleteCategory,
        moveCategoryOrder,
        saveCat,
        deleteCat,
        updateCatStatus,
        toggleCatFeatured,
        savePromo,
        deletePromo,
        togglePromoPublished,
        updateReservationStatus,
        updateReviewStatus,
        saveCafeInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}