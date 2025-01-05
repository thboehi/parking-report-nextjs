'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2'; // Importation de SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // Style pour SweetAlert2

export default function Home() {
  const [plaques, setPlaques] = useState([]);
  const [search, setSearch] = useState('');
  const [numero, setNumero] = useState('');
  const [country, setCountry] = useState('Suisse');
  const [canton, setCanton] = useState('FR');
  const [showCantons, setShowCantons] = useState(true);
  const [sortField, setSortField] = useState('createdAt'); // Champ de tri (création ou modification)
  const [sortOrder, setSortOrder] = useState('desc'); // Ordre de tri (ascendant ou descendant)

  const DarkSwal = Swal.mixin({
    background: '#1a202c', // Couleur de fond personnalisée
    color: '#fff', // Couleur du texte pour contraste
  });

  // Chargement initial des plaques avec tri
  useEffect(() => {
    fetch(`/api/plaques?search=${search}&sortField=${sortField}&sortOrder=${sortOrder}`)
      .then((res) => res.json())
      .then(setPlaques);
  }, [search, sortField, sortOrder]);

  // Ajouter une plaque
  const addPlaque = async (e) => {
    e.preventDefault();
    await fetch('/api/plaques', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero, country, canton }),
    });
    setNumero('');
    fetch(`/api/plaques?search=${search}&sortField=${sortField}&sortOrder=${sortOrder}`)
      .then((res) => res.json())
      .then(setPlaques);
  };

  // Inverser l'état de "Dénoncé"
  const toggleDenounce = async (id) => {
    await fetch('/api/plaques', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetch(`/api/plaques?search=${search}&sortField=${sortField}&sortOrder=${sortOrder}`)
      .then((res) => res.json())
      .then(setPlaques);
  };

  // Supprimer une plaque avec confirmation
  const deletePlaque = async (id) => {
    const result = await DarkSwal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action supprimera définitivement la plaque.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    });

    if (result.isConfirmed) {
      await fetch('/api/plaques', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetch(`/api/plaques?search=${search}&sortField=${sortField}&sortOrder=${sortOrder}`)
        .then((res) => res.json())
        .then(setPlaques);
      DarkSwal.fire('Supprimé !', 'La plaque a été supprimée.', 'success');
    }
  };

  const cantons = [
    { code: 'AG', name: 'Argovie' },
    { code: 'AI', name: 'Appenzell Rhodes-Intérieures' },
    { code: 'AR', name: 'Appenzell Rhodes-Extérieures' },
    { code: 'BE', name: 'Berne' },
    { code: 'BL', name: 'Bâle-Campagne' },
    { code: 'BS', name: 'Bâle-Ville' },
    { code: 'FR', name: 'Fribourg' },
    { code: 'GE', name: 'Genève' },
    { code: 'GL', name: 'Glaris' },
    { code: 'GR', name: 'Grisons' },
    { code: 'JU', name: 'Jura' },
    { code: 'LU', name: 'Lucerne' },
    { code: 'NE', name: 'Neuchâtel' },
    { code: 'NW', name: 'Nidwald' },
    { code: 'OW', name: 'Obwald' },
    { code: 'SG', name: 'Saint-Gall' },
    { code: 'SH', name: 'Schaffhouse' },
    { code: 'SO', name: 'Soleure' },
    { code: 'SZ', name: 'Schwytz' },
    { code: 'TG', name: 'Thurgovie' },
    { code: 'TI', name: 'Tessin' },
    { code: 'UR', name: 'Uri' },
    { code: 'VD', name: 'Vaud' },
    { code: 'VS', name: 'Valais' },
    { code: 'ZG', name: 'Zoug' },
    { code: 'ZH', name: 'Zurich' },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-6">
        <Image
          src="/topshop_logo.png"
          alt="TopShop Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
        <h1 className="text-4xl font-bold mt-4">Avertissements parking</h1>
      </div>

      {/* Formulaire d'ajout de plaque */}
      <form onSubmit={addPlaque} className="mb-6">
        <input
          type="text"
          placeholder="Numéro de plaque"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
          className="border p-2 rounded w-full mb-2 dark:bg-gray-800 dark:border-gray-700"
        />
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setShowCantons(e.target.value === 'Suisse');
            if (e.target.value !== 'Suisse') setCanton('');
            if (e.target.value == 'Suisse') setCanton('FR');
          }}
          required
          className="border p-2 rounded w-full mb-2 dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="" disabled>Sélectionnez un pays</option>
          <option value="Suisse">Suisse</option>
          <option value="France">France</option>
          <option value="Allemagne">Allemagne</option>
          <option value="Italie">Italie</option>
        </select>
        {showCantons && (
          <select
            value={canton}
            onChange={(e) => setCanton(e.target.value)}
            required
            className="border p-2 rounded w-full mb-2 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="" disabled>Sélectionnez un canton</option>
            {cantons.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        )}
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Ajouter</button>
      </form>

      {/* Barre de tri */}
      <div className="mb-6 flex gap-2 items-center justify-items-center">
        <input
          type="text"
          placeholder="Rechercher une plaque"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full dark:bg-gray-800 dark:border-gray-700"
        />
        <div className="flex gap-4">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="border p-2 rounded w-40 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="createdAt">Création</option>
            <option value="editedAt">Modification</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded w-40 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
          </select>
        </div>
      </div>

      {/* Liste des plaques */}
      <ul className="space-y-4">
        {plaques.map((plaque) => (
          <li key={plaque._id} className="p-6 bg-gray-50 border rounded shadow-sm dark:bg-gray-800 dark:border-gray-700 relative group">
            {/* Bouton de suppression */}
            <button
              onClick={() => deletePlaque(plaque._id)}
              className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              title="Supprimer"
            >
              ×
            </button>

            <div>
              <span className='text-xl font-bold text-blue-600'>{plaque.canton ? `${plaque.canton}` : ''}</span>
              <span className='text-xl font-bold text-blue-600'>{plaque.numero} </span>
              <span className='text-xl font-bold text-blue-600 opacity-50'>({plaque.country})</span>
              <p className="text-sm text-gray-500">
                Ajouté le {new Date(plaque.createdAt).toLocaleString()}
              </p>
              {plaque.editedAt && (
                <p className="text-sm text-gray-500 opacity-50">
                  Modifié le {new Date(plaque.editedAt).toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              {/* Avertis */}
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${
                  plaque.reports === 1
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                Avertis : {plaque.reports}
              </span>

              {/* Dénoncé */}
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${
                  plaque.denounced
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                Dénoncé : {plaque.denounced ? 'Oui' : 'Non'}
              </span>
              {/* Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={plaque.denounced}
                  onChange={() => toggleDenounce(plaque._id)}
                  className="sr-only peer"
                />
                <div
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 
                    rounded-full peer dark:bg-gray-700 peer-checked:bg-red-500"
                ></div>
                <div
                  className="w-5 h-5 bg-white rounded-full shadow-sm absolute left-1 top-0.5 peer-checked:translate-x-5 
                    transition-transform"
                ></div>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}