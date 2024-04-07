import { ITag } from '@/interfaces';
import { X } from '@phosphor-icons/react/dist/ssr';
import { FC } from 'react';

type SelectedTagProps = {
  tag: ITag;
  removeTag(id: string): void;
};

const SelectedTag: FC<SelectedTagProps> = ({ tag, removeTag }) => {
  return (
    <div
      className='flex items-center gap-2 rounded-lg border-2 p-2'
      style={{ borderColor: tag.color }}
    >
      <span>{tag.name}</span>
      <button
        className='btn btn-ghost h-fit min-h-0 p-2 font-bold'
        aria-label='Remover tag'
        type='button'
        onClick={() => removeTag(tag.id)}
      >
        <X />
      </button>
    </div>
  );
};

export default SelectedTag;
