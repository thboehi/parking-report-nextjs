import dbConnect from '../../../lib/mongodb';
import Plaque from '../../../models/Plaque';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const sortField = searchParams.get('sortField') || 'createdAt'; // Champ de tri : createdAt ou editedAt
  const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1; // Ordre de tri : asc ou desc

  const plaques = search
    ? await Plaque.find({ numero: { $regex: search, $options: 'i' } }).sort({ [sortField]: sortOrder })
    : await Plaque.find({}).sort({ [sortField]: sortOrder });

  return new Response(JSON.stringify(plaques), { status: 200 });
}

export async function POST(request) {
  await dbConnect();
  const { numero, country, canton } = await request.json();
  const existingPlaque = await Plaque.findOne({ numero, country, canton });

  if (existingPlaque) {
    existingPlaque.reports += 1;
    existingPlaque.editedAt = new Date(); // Mise à jour du timestamp de modification
    await existingPlaque.save();
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } else {
    const newPlaque = new Plaque({ numero, country, canton });
    await newPlaque.save();
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  }
}

export async function PATCH(request) {
  await dbConnect();
  const { id } = await request.json();
  const plaque = await Plaque.findById(id);

  if (plaque) {
    plaque.denounced = !plaque.denounced;
    plaque.editedAt = new Date(); // Mise à jour du timestamp de modification
    await plaque.save();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: 'Plaque introuvable' }), { status: 404 });
}

export async function DELETE(request) {
  await dbConnect();
  const { id } = await request.json();
  await Plaque.findByIdAndDelete(id);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}