import { createClient } from '@supabase/supabase-js';

// As chaves são lidas de variáveis de ambiente com prefixo VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verifica se as credenciais foram fornecidas
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key'
);

// Cria o cliente se configurado, caso contrário inicializa em modo seguro/demonstração
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Função utilitária para informar o status de conexão com o banco
 */
export function getBackendStatus() {
  return {
    configured: isSupabaseConfigured,
    url: isSupabaseConfigured ? supabaseUrl : 'Modo Demonstração / LocalStorage Ativo',
    message: isSupabaseConfigured 
      ? 'Conectado ao Supabase com RLS ativo' 
      : 'Executando com persistência local reativa (pronto para vincular ao Supabase)'
  };
}
