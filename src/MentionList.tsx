import React from 'react';
import { useCounter, useKey } from 'react-use';

export type MentionListProps = {
  items: string[];
  command: (obj: unknown) => void;
};

export enum MentionKeys {
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ENTER = 'Enter',
}

export const MentionList = ({ items, command }: MentionListProps) => {
  const [currentSelect, { inc, dec }] = useCounter(0, items.length - 1, 0);

  useKey(MentionKeys.ARROW_DOWN, () => inc());
  useKey(MentionKeys.ARROW_UP, () => dec());
  useKey(
    MentionKeys.ENTER,
    () => command({ id: items[currentSelect] }),
    { event: 'keydown' },
    [currentSelect],
  );

  return (
    <div>
      {items.map((item, index) => (
        <div>{`${currentSelect === index ? '* ' : ''}${item}`}</div>
      ))}
    </div>
  );
};
