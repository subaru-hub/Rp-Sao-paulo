/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AlertBanner } from './components/AlertBanner';
import { StatusConsultaModal } from './components/StatusConsultaModal';

import { HomePage } from './pages/HomePage';
import { HierarquiaPage } from './pages/HierarquiaPage';
import { EditaisPage } from './pages/EditaisPage';
import { InscricoesPage } from './pages/InscricoesPage';
import { AcademiaPage } from './pages/AcademiaPage';
import { LegislacaoPage } from './pages/LegislacaoPage';
import { NoticiasPage } from './pages/NoticiasPage';
import { JogoPage } from './pages/JogoPage';
import { AdminPage } from './pages/AdminPage';

import { portalStore } from './services/store';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('inicio');
  const [preselectedEdictId, setPreselectedEdictId] = useState<string | undefined>(undefined);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [consultProtocol, setConsultProtocol] = useState('');

  // Estados sincronizados com a store
  const [settings, setSettings] = useState(portalStore.getSettings());
  const [announcements, setAnnouncements] = useState(portalStore.getAnnouncements());
  const [edicts, setEdicts] = useState(portalStore.getEdicts());
  const [members, setMembers] = useState(portalStore.getMembers());
  const [sectors, setSectors] = useState(portalStore.getSectors());
  const [ranks, setRanks] = useState(portalStore.getRanks());
  const [units, setUnits] = useState(portalStore.getUnits());
  const [courses, setCourses] = useState(portalStore.getCourses());

  useEffect(() => {
    // Sincroniza abas via hash caso o usuário digite #admin ou navegue
    const hash = window.location.hash.replace('#', '');
    if (hash && ['inicio', 'hierarquia', 'editais', 'inscricoes', 'academia', 'legislacao', 'noticias', 'jogo', 'admin'].includes(hash)) {
      setCurrentTab(hash);
    }

    const unsubscribe = portalStore.subscribe(() => {
      setSettings(portalStore.getSettings());
      setAnnouncements(portalStore.getAnnouncements());
      setEdicts(portalStore.getEdicts());
      setMembers(portalStore.getMembers());
      setSectors(portalStore.getSectors());
      setRanks(portalStore.getRanks());
      setUnits(portalStore.getUnits());
      setCourses(portalStore.getCourses());
    });

    return () => unsubscribe();
  }, []);

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEdictToApply = (edictId: string) => {
    setPreselectedEdictId(edictId);
    handleNavigate('inscricoes');
  };

  const handleOpenConsultWithProtocol = (protocol: string) => {
    setConsultProtocol(protocol);
    setConsultModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Banner de Comunicado Urgente no Topo */}
      {settings.emergency_banner_active && (
        <AlertBanner
          message={settings.emergency_banner_text}
          onAction={() => handleNavigate('editais')}
          actionText="Ver Concurso Aberto"
        />
      )}

      {/* Navegação Superior Institucional */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenConsultModal={() => {
          setConsultProtocol('');
          setConsultModalOpen(true);
        }}
      />

      {/* Conteúdo Dinâmico da Página */}
      <main className="flex-1">
        {currentTab === 'inicio' && (
          <HomePage
            onNavigate={handleNavigate}
            announcements={announcements}
            edicts={edicts}
            discordUrl={settings.discord_url}
            robloxUrl={settings.roblox_game_url}
            googleFormsUrl={settings.google_forms_recruitment_url}
            onOpenConsultModal={() => {
              setConsultProtocol('');
              setConsultModalOpen(true);
            }}
            totalMembers={members.length}
          />
        )}

        {currentTab === 'hierarquia' && (
          <HierarquiaPage
            members={members}
            ranks={ranks}
            sectors={sectors}
            units={units}
          />
        )}

        {currentTab === 'editais' && (
          <EditaisPage
            edicts={edicts}
            settings={settings}
            onSelectEdictToApply={handleSelectEdictToApply}
          />
        )}

        {currentTab === 'inscricoes' && (
          <InscricoesPage
            edicts={edicts}
            settings={settings}
            preselectedEdictId={preselectedEdictId}
            onOpenConsultModalWithProtocol={handleOpenConsultWithProtocol}
          />
        )}

        {currentTab === 'academia' && (
          <AcademiaPage
            courses={courses}
          />
        )}

        {currentTab === 'legislacao' && (
          <LegislacaoPage />
        )}

        {currentTab === 'noticias' && (
          <NoticiasPage
            announcements={announcements}
          />
        )}

        {currentTab === 'jogo' && (
          <JogoPage
            robloxUrl={settings.roblox_game_url}
            discordUrl={settings.discord_url}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPage />
        )}
      </main>

      {/* Rodapé Institucional Governamental com Aviso Legal */}
      <Footer
        onNavigate={handleNavigate}
        discordUrl={settings.discord_url}
        robloxUrl={settings.roblox_game_url}
      />

      {/* Modal Rápido de Consulta de Protocolo */}
      <StatusConsultaModal
        isOpen={consultModalOpen}
        onClose={() => setConsultModalOpen(false)}
        initialProtocol={consultProtocol}
      />

    </div>
  );
}
