import React, { useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

export default function LoginPage(){
  const { login, isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    orgId: '00000000-0000-0000-0000-000000000001',
    email: 'admin@disagua.local',
    password: 'admin123',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if(isAuthenticated){
    return <Navigate to="/" replace />;
  }

  async function onSubmit(e){
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
    } catch (err) {
      setError(err.message || 'Não foi possível autenticar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card title="Entrar">
          <form onSubmit={onSubmit} className="grid gap-3">
            <Input
              label="ID da Organização"
              value={form.orgId}
              onChange={(e) => setForm({ ...form, orgId: e.target.value })}
              required
            />
            <Input
              label="E-mail"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Senha"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </Button>
          </form>
          <p className="mt-4 text-xs text-slate-500">
            Dica: use as credenciais padrão do seed ou atualize no backend.
          </p>
        </Card>
      </div>
    </div>
  );
}
