import { MouseEventHandler } from 'react';
import { FormEventHandler } from 'react';
import { FormEvent } from 'react';

interface ModalConfigType {
  isOpen: boolean;
  breadcrumb?: {
    label: string;
    href: string;
    isMain: boolean;
  }[];
  submitText?: string;
  renderModalContent?: ReactNode;
  maskStyle?: CSSProperties;
  cancelText?: string;
  onCancel?: () => void;
  onSubmit?: (
    e:
      | FormEvent<HTMLFormElement>
      | MouseEventHandler<HTMLButtonElement, MouseEvent>
  ) => void;
  contentStyle?: CSSProperties;
  width?: number | string;
}

interface ModalContextType {
  modalConfig: ModalConfigType;
  changeModaConfig: (modalConfig: ModalConfigType) => void;
}
