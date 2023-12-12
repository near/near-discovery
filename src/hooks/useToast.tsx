import { toast } from 'react-toastify';

import Toast from '@/components/Toast';

export default function useToast() {
  const success = (params: { title: string; text?: string }) => {
    return toast(<Toast type="success" {...params} />);
  };
  const fail = (params: { title: string; text?: string }) => {
    return toast(<Toast type="error" {...params} />);
  };
  const info = (params: { title: string; text?: string }) => {
    return toast(<Toast type="info" {...params} />);
  };
  const loading = (params: { title: string; text?: string }) => {
    return toast(<Toast type="pending" {...params} />);
  };
  return {
    success,
    fail,
    info,
    loading,
    dismiss: toast.dismiss,
  };
}
