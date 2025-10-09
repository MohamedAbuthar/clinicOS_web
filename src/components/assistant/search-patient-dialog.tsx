import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SearchPatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchPhone: string
  onSearchPhoneChange: (value: string) => void
  onSearch: () => void
}

export function SearchPatientDialog({
  open,
  onOpenChange,
  searchPhone,
  onSearchPhoneChange,
  onSearch
}: SearchPatientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 gap-0 bg-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Book Appointment for Patient
            </DialogTitle>
            <p className="text-sm text-gray-600 mt-1">
              Search for patient by mobile number
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-sm opacity-70 hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-900"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="search-phone" className="text-sm font-medium">
              Mobile Number
            </Label>
            <div className="flex gap-2">
              <Input
                id="search-phone"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
                value={searchPhone}
                onChange={(e) => onSearchPhoneChange(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchPhone.length === 10) {
                    onSearch()
                  }
                }}
                className="h-11 flex-1"
              />
              <Button
                onClick={onSearch}
                disabled={searchPhone.length !== 10}
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}