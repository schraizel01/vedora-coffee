import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Vedora Coffee REST API berjalan dengan baik!'
  });
});

// 1. GET Semua Data Katalog Publik (dipakai oleh AppContext frontend)
app.get('/api/catalog', async (req, res) => {
  try {
    const [
      cafeRes,
      hoursRes,
      catgRes,
      menuRes,
      catsRes,
      promoRes,
      revRes,
    ] = await Promise.all([
      supabase.from('cafe_info').select('*').limit(1).maybeSingle(),
      supabase.from('opening_hours').select('*').order('day_of_week', { ascending: true }),
      supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('menu_items').select('*').order('id', { ascending: false }),
      supabase.from('cats').select('*').order('id', { ascending: false }),
      supabase.from('promos').select('*').order('id', { ascending: false }),
      supabase
        .from('reviews')
        .select('*, author:profiles!reviews_user_id_fkey(name)')
        .order('created_at', { ascending: false }),
    ]);

    res.json({
      cafeInfo: cafeRes.data || null,
      openingHours: hoursRes.data || [],
      categories: catgRes.data || [],
      menuItems: menuRes.data || [],
      cats: catsRes.data || [],
      promos: promoRes.data || [],
      reviews: revRes.data || [],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET Semua Menu & Detail Menu
app.get('/api/menus', async (req, res) => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('id', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get('/api/menus/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'Menu tidak ditemukan' });
  res.json(data);
});

// 3. GET Semua Kucing & Detail Kucing
app.get('/api/cats', async (req, res) => {
  const { data, error } = await supabase
    .from('cats')
    .select('*')
    .order('id', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get('/api/cats/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('cats')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: 'Data kucing tidak ditemukan' });
  res.json(data);
});

// 4. GET & POST Reservasi
app.get('/api/reservations', async (req, res) => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('id', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/reservations', async (req, res) => {
  const { data, error } = await supabase
    .from('reservations')
    .insert([req.body])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.listen(PORT, () => {
  console.log(`Server Vedora API berjalan di http://localhost:${PORT}`);
});

export default app;