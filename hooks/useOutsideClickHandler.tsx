import { useEffect, MouseEvent, RefObject } from 'react';

interface IProps {
  ref: RefObject<HTMLElement> | null;
  secondRef?: RefObject<HTMLElement> | undefined;
  callback: () => void;
}

/**
 *
 * @description This hook is used to handle the click outside of the element
 */

const useOutsideClickHandler = (props: IProps): void => {
  const { ref, secondRef, callback } = props;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // In case if we want to pass the optional second ref
      if (secondRef) {
        if (
          !ref?.current?.contains(event.target as Node) &&
          !secondRef.current?.contains(event.target as Node)
        ) {
          event.stopPropagation();
          callback();
          return;
        }
      }

      // In case if we do not want to pass the optional second ref
      console.log('sss');
      if (!ref.current.contains(event.target as Node)) {
        event.stopPropagation();
        callback();
        return;
      }
    };

    document.addEventListener('mousedown', event => handleClickOutside(event));

    return () => {
      document.removeEventListener('mousedown', event =>
        handleClickOutside(event)
      );
    };
  }, [ref]);
};

export default useOutsideClickHandler;
