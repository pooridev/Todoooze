import { FormEvent } from 'react';

interface ModalConfigType {
  toggle: boolean;
  title?: string;
  footer?: ReactNode;
  submitText?: string;
  modalContent?: ReactNode;
  maskStyle?: CSSProperties;
  cancelText?: string;
  onCancel?: () => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  contentStyle?: CSSProperties;
  width?: number | string;
}

interface ModalContextType {
  modalConfig: ModalConfigType;
  changeModaConfig: (modalConfig: ModalConfigType) => void;
}
