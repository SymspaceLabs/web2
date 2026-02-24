// =========================================================
// Job Application Form Fields
// =========================================================

import Link from "next/link";
import SymDropdown from "../inputs/sym-dropdown";
import SymTextField from "../inputs/sym-textfield";
import SymFileUploader from "../inputs/sym-file-uploader";

interface JobFormProps {
  email: string;
  setEmail: (v: string) => void;
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  repeatPassword: string;
  setRepeatPassword: (v: string) => void;
  linkedInUrl: string;
  setLinkedInUrl: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
  comments: string;
  setComments: (v: string) => void;
  uploadedFile: File[];
  setUploadedFile: (files: File[]) => void;
  isAuthenticated: boolean;
}

function JobForm({
  email, setEmail,
  firstName, setFirstName,
  lastName, setLastName,
  password, setPassword,
  repeatPassword, setRepeatPassword,
  linkedInUrl, setLinkedInUrl,
  role, setRole,
  comments, setComments,
  uploadedFile, setUploadedFile,
  isAuthenticated,
}: JobFormProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ROW 1 — Email */}
      <SymTextField
        title="Email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* ROW 2 — Name */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <SymTextField
          title="First Name"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <SymTextField
          title="Last Name"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* ROW 3 — Password (only when not authenticated) */}
      {!isAuthenticated && (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <SymTextField
            title="Password"
            value={password}
            placeholder="******"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <SymTextField
            title="Repeat Password"
            value={repeatPassword}
            placeholder="******"
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
      )}

      {/* ROW 4 — LinkedIn + Role */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <SymTextField
          title="LinkedIn"
          value={linkedInUrl}
          placeholder="LinkedIn URL"
          onChange={(e) => setLinkedInUrl(e.target.value)}
        />
        <SymDropdown
          title="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={["Option 1", "Option 2"]}
          isEdit={true}
        />
      </div>

      {/* ROW 5 — Comments */}
      <SymTextField
        title="Comment"
        value={comments}
        placeholder="Enter comment here"
        onChange={(e) => setComments(e.target.value)}
        multiline
      />

      {/* ROW 6 — Resume Upload */}
      <SymFileUploader
        title="Upload Resume"
        setUploadedFile={setUploadedFile}
        uploadedFile={uploadedFile}
        multiple={true}
      />

      {/* Terms */}
      <p className="text-white text-[11px] sm:text-[13px] font-helvetica leading-relaxed">
        By clicking Submit, you agree to our{" "}
        <Link href="/terms-and-conditions#terms" className="text-[#3084FF] hover:underline">
          Terms
        </Link>
        ,{" "}
        <Link href="/terms-and-conditions#privacy" className="text-[#3084FF] hover:underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms-and-conditions#cookies" className="text-[#3084FF] hover:underline">
          Cookies
        </Link>
        . You may receive SMS Notifications from us and can opt out any time.
      </p>
    </div>
  );
}

export default JobForm;