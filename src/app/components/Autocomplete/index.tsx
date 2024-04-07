import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';

interface Item {
  name: string;
  id: string;
}

type AutocompleteProps = {
  items: Item[];
  onItemClick(id: string): void;
  clearQueryOnClick?: Boolean;
};

const Autocomplete: FC<AutocompleteProps> = ({
  items,
  onItemClick,
  clearQueryOnClick = false,
}) => {
  const [query, setQuery] = useState<string>('');
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);

  items.sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    if (!query) {
      setVisibleItems(items);
      return;
    }

    const newitems = items.filter((e) =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );

    setVisibleItems(newitems);
  }, [items, query]);

  return (
    <div className='dropdown w-full'>
      <input
        type='text'
        className='input input-bordered w-full'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        tabIndex={0}
      />
      <div className='dropdown-content top-14 max-h-96 w-full overflow-auto rounded-md bg-base-200'>
        <ul
          className={classNames({
            menu: visibleItems.length !== 0,
          })}
        >
          {visibleItems.map((item, index) => {
            return (
              <li
                key={item.id}
                tabIndex={index + 1}
                className='w-full border-b last:border-b-0 [&:not(:last-child)]:border-b-base-content/10'
              >
                <button
                  onClick={() => {
                    onItemClick(item.id);
                    if (clearQueryOnClick) {
                      setQuery('');
                    } else {
                      setQuery(item.name);
                    }
                    const elem = document.activeElement as HTMLElement;
                    if (elem) elem?.blur();
                  }}
                  type='button'
                >
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
