import PlaidSyncAccount from '../plaid/PlaidSyncAccount';
import Modal from '../ui/Modal';

type PlaidSyncDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PlaidSyncDialog({
  isOpen,
  onClose,
}: PlaidSyncDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="max-w-lg">
      <div className="pb-8">
        <PlaidSyncAccount onClose={onClose} />
      </div>
    </Modal>
  );
}
