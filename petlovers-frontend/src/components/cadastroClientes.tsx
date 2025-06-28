import React, { useState, useEffect } from 'react';
import { Cliente, Telefone, Endereco, clienteService } from '../services/clienteservices';

type Props = {
  onSuccess: () => void;
  onCancelar: () => void;
  cliente?: Cliente;
  modoEdicao?: boolean;
};

export default function FormularioCadastroCliente({ onSuccess, onCancelar, cliente, modoEdicao }: Props) {
  const [form, setForm] = useState<Omit<Cliente, 'id'>>({
    nome: '',
    nomeSocial: '',
    email: '',
    endereco: {
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      codigoPostal: '',
      informacoesAdicionais: ''
    },
    telefones: [{
      ddd: '',
      numero: ''
    }]
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cliente && modoEdicao) {
      setForm({
        nome: cliente.nome,
        nomeSocial: cliente.nomeSocial,
        email: cliente.email || '',
        endereco: { ...cliente.endereco },
        telefones: cliente.telefones.length > 0 ? [...cliente.telefones] : [{ ddd: '', numero: '' }]
      });
    }
  }, [cliente, modoEdicao]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.nome || !form.nomeSocial) {
      alert('Nome e Nome Social são obrigatórios');
      return;
    }

    try {
      setLoading(true);
      
      if (modoEdicao && cliente?.id) {
        await clienteService.atualizarCliente({ ...form, id: cliente.id });
        alert('Cliente atualizado com sucesso!');
      } else {
        await clienteService.cadastrarCliente(form);
        alert('Cliente cadastrado com sucesso!');
      }
      
      onSuccess();
    } catch (error: any) {
      alert(`Erro ao salvar cliente: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const atualizarTelefone = (index: number, campo: keyof Telefone, valor: string) => {
    const novosTelefones = [...form.telefones];
    novosTelefones[index] = { ...novosTelefones[index], [campo]: valor };
    setForm({ ...form, telefones: novosTelefones });
  };

  const adicionarTelefone = () => {
    setForm({
      ...form,
      telefones: [...form.telefones, { ddd: '', numero: '' }]
    });
  };

  const removerTelefone = (index: number) => {
    if (form.telefones.length > 1) {
      const novosTelefones = form.telefones.filter((_, i) => i !== index);
      setForm({ ...form, telefones: novosTelefones });
    }
  };

  const atualizarEndereco = (campo: keyof Endereco, valor: string) => {
    setForm({
      ...form,
      endereco: { ...form.endereco, [campo]: valor }
    });
  };

  return (
    <div className="container mt-4">
      <h2>{modoEdicao ? 'Editar Cliente' : 'Cadastro de Cliente'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Nome *</label>
            <input
              type="text"
              className="form-control"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
            />
          </div>
          
          <div className="col-md-6 mb-3">
            <label className="form-label">Nome Social *</label>
            <input
              type="text"
              className="form-control"
              value={form.nomeSocial}
              onChange={(e) => setForm({ ...form, nomeSocial: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={form.email || ''}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <h4>Telefones</h4>
        {form.telefones.map((telefone, index) => (
          <div key={index} className="row mb-2">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="DDD"
                value={telefone.ddd}
                onChange={(e) => atualizarTelefone(index, 'ddd', e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Número"
                value={telefone.numero}
                onChange={(e) => atualizarTelefone(index, 'numero', e.target.value)}
              />
            </div>
            <div className="col-md-3">
              {form.telefones.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removerTelefone(index)}
                >
                  Remover
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={adicionarTelefone}>
          Adicionar Telefone
        </button>

        <h4>Endereço</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Estado</label>
            <input
              type="text"
              className="form-control"
              value={form.endereco.estado}
              onChange={(e) => atualizarEndereco('estado', e.target.value)}
            />
          </div>
          
          <div className="col-md-6 mb-3">
            <label className="form-label">Cidade</label>
            <input
              type="text"
              className="form-control"
              value={form.endereco.cidade}
              onChange={(e) => atualizarEndereco('cidade', e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Bairro</label>
            <input
              type="text"
              className="form-control"
              value={form.endereco.bairro}
              onChange={(e) => atualizarEndereco('bairro', e.target.value)}
            />
          </div>
          
          <div className="col-md-6 mb-3">
            <label className="form-label">Rua</label>
            <input
              type="text"
              className="form-control"
              value={form.endereco.rua}
              onChange={(e) => atualizarEndereco('rua', e.target.value)}
            />
          </div>
          
          <div className="col-md-2 mb-3">
            <label className="form-label">Número</label>
            <input
              type="text"
              className="form-control"
              value={form.endereco.numero}
              onChange={(e) => atualizarEndereco('numero', e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">CEP</label>
            <input
              type="text"
              className="form-control"
              value={form.endereco.codigoPostal}
              onChange={(e) => atualizarEndereco('codigoPostal', e.target.value)}
            />
          </div>
          
          <div className="col-md-6 mb-3">
            <label className="form-label">Informações Adicionais</label>
            <input
              type="text"
              className="form-control"
              value={form.endereco.informacoesAdicionais}
              onChange={(e) => atualizarEndereco('informacoesAdicionais', e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : (modoEdicao ? 'Atualizar' : 'Cadastrar')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
