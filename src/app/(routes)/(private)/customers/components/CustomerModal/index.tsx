import Autocomplete from '@/app/components/Autocomplete';
import classNames from 'classnames';
import { Dispatch, FC, SetStateAction } from 'react';
import { ICustomer, ITag } from '@/interfaces';
import { tags } from '@/mock/tags';
import SelectedTag from '../SelectedTag';

type CustomerModalProps = {
  modalRef: React.Ref<HTMLDialogElement>;
  customerElement?: ICustomer;
  selectedTags: ITag[];
  setSelectedTags: Dispatch<SetStateAction<ITag[]>>;
};

const CustomerModal: FC<CustomerModalProps> = ({
  modalRef,
  customerElement,
  selectedTags,
  setSelectedTags,
}) => {
  const addSelectedTag = (id: string) => {
    const tag = tags.find((tag) => tag.id === id);
    if (tag) {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  const removeSelectedTag = (id: string) => {
    const tag = tags.find((tag) => tag.id === id);
    if (tag) {
      setSelectedTags((prevItems) => prevItems.filter((tag) => tag.id !== id));
    }
  };

  return (
    <dialog
      ref={modalRef}
      id='attendant-modal'
      className='modal modal-bottom sm:modal-middle'
    >
      <div className='modal-box'>
        <form id='attendant-form' method='post' className='flex flex-col gap-4'>
          <label
            htmlFor='name'
            className='form-control gap-2'
            aria-label='Nome completo'
          >
            <span>Nome completo</span>
            <div className='input input-bordered flex w-full items-center gap-2'>
              <input
                id='name'
                type='text'
                className='min-w-0 grow'
                value={customerElement?.name}
                required
              />
            </div>
          </label>

          <label htmlFor='tag' className='form-control gap-2'>
            <span>Tags</span>
            <Autocomplete
              placeholder='Buscar tags'
              clearQueryOnClick
              onItemClick={addSelectedTag}
              items={tags
                .filter((tag) => !selectedTags.includes(tag))
                .map((tag) => ({ name: tag.name, id: tag.id }))}
            />
            <div
              className={classNames({
                'flex flex-wrap gap-4': true,
                'pt-2': selectedTags.length !== 0,
              })}
            >
              {selectedTags
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((tag) => (
                  <SelectedTag
                    key={tag.id}
                    tag={tag}
                    removeTag={removeSelectedTag}
                  />
                ))}
            </div>
          </label>

          <label htmlFor='cpf' className='form-control gap-2' aria-label='CPF'>
            <span>CPF</span>
            <div className='input input-bordered flex w-full items-center gap-2'>
              <input
                id='cpf'
                type='text'
                className='min-w-0 grow'
                value={customerElement?.cpf}
                readOnly={Boolean(customerElement?.cpf)}
                required
              />
            </div>
          </label>

          <label
            htmlFor='email'
            className='form-control gap-2'
            aria-label='E-mail'
          >
            <span>E-mail</span>
            <div className='input input-bordered flex w-full items-center gap-2'>
              <input
                id='email'
                type='email'
                className='min-w-0 grow'
                value={customerElement?.email}
                required
              />
            </div>
          </label>

          <label
            htmlFor='phone'
            className='form-control gap-2'
            aria-label='Telefone'
          >
            <span>Telefone</span>
            <div className='input input-bordered flex w-full items-center gap-2'>
              <input
                id='phone'
                type='tel'
                className='min-w-0 grow'
                value={customerElement?.phone}
                required
              />
            </div>
          </label>

          <label
            className='form-control gap-2'
            htmlFor='brith'
            aria-label='Data de nascimento'
          >
            <span>Data de nascimento</span>
            <div className='input input-bordered flex w-full items-center gap-2'>
              <input
                type='date'
                id='brith'
                placeholder='dd/MM/yyyy'
                className='min-w-0 grow'
                value={customerElement?.birth_date
                  .toISOString()
                  .substring(0, 10)}
                required
              />
            </div>
          </label>

          <label htmlFor='cep' className='form-control gap-2' aria-label='CEP'>
            <span>CEP</span>
            <div className='input input-bordered flex w-full items-center gap-2'>
              <input
                id='cep'
                type='text'
                className='min-w-0 grow'
                value={customerElement?.Address.cep}
                required
              />
            </div>
          </label>

          <label
            htmlFor='state'
            className='form-control gap-2'
            aria-label='Estado'
          >
            <span>Estado</span>
            <div className='input input-bordered flex w-full items-center gap-2'>
              <input
                id='city'
                type='text'
                className='min-w-0 grow'
                value={customerElement?.Address.state}
                required
              />
            </div>
          </label>

          <label
            htmlFor='city'
            className='form-control gap-2'
            aria-label='Cidade'
          >
            <span>Cidade</span>
            <div className='input input-bordered flex w-full items-center gap-2'>
              <input
                id='city'
                type='text'
                className='min-w-0 grow'
                value={customerElement?.Address.city}
                required
              />
            </div>
          </label>

          <label
            htmlFor='neighborhood'
            className='form-control gap-2'
            aria-label='Bairro'
          >
            <span>Bairro</span>
            <div className='input input-bordered flex w-full items-center gap-2'>
              <input
                id='neighborhood'
                type='text'
                className='min-w-0 grow'
                value={customerElement?.Address.neighborhood}
                required
              />
            </div>
          </label>

          <label
            htmlFor='street'
            className='form-control gap-2'
            aria-label='Rua'
          >
            <span>Rua</span>
            <div className='input input-bordered flex w-full items-center gap-2'>
              <input
                id='street'
                type='text'
                className='min-w-0 grow'
                value={customerElement?.Address.street_name}
                required
              />
            </div>
          </label>

          <label
            htmlFor='number'
            className='form-control gap-2'
            aria-label='Número'
          >
            <span>Número</span>
            <div className='input input-bordered flex w-full items-center gap-2'>
              <input
                id='number'
                type='text'
                className='min-w-0 grow'
                value={customerElement?.Address.number}
                required
              />
            </div>
          </label>

          <label
            htmlFor='complement'
            className='form-control gap-2'
            aria-label='Complemento'
          >
            <span>Complemento</span>
            <div className='input input-bordered flex w-full items-center gap-2'>
              <input
                id='complement'
                type='text'
                className='min-w-0 grow'
                value={customerElement?.Address.complement}
                required
              />
            </div>
          </label>
        </form>

        <div className='modal-action'>
          <form method='dialog'>
            <button type='submit' className='btn btn-ghost'>
              Cancelar
            </button>
          </form>
          <button type='submit' form='attendant-form' className='btn'>
            Salvar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CustomerModal;
