import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ColorTheme = 'LIGHT' | 'DARK' | 'SYSTEM';
type Language = 'DE' | 'EN';

interface ProfileForm {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  bio: string;
}

interface AddressForm {
  country: string;
  street: string;
  number: string;
  additionalAddressInfo: string;
  zipCode: string;
  city: string;
}

interface SettingsForm {
  language: Language;
  webColorTheme: ColorTheme;
  mobileColorTheme: ColorTheme;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfileComponent {
  readonly profile = signal<ProfileForm>({
    firstname: 'Felix',
    lastname: 'Müller',
    username: 'felix',
    email: 'felix@easylife.app',
    bio: 'Productivity enthusiast and developer. Building Easy Life one feature at a time.',
  });

  readonly address = signal<AddressForm>({
    country: 'Germany',
    street: 'Musterstraße',
    number: '42',
    additionalAddressInfo: '',
    zipCode: '40213',
    city: 'Düsseldorf',
  });

  readonly settings = signal<SettingsForm>({
    language: 'DE',
    webColorTheme: 'LIGHT',
    mobileColorTheme: 'LIGHT',
    emailNotifications: true,
    pushNotifications: false,
  });

  hasUnsavedChanges = signal(false);
  profileImagePath = signal<string | null>(null);

  readonly bioMaxLength = 240;
  readonly bioLength = computed(() => this.profile().bio.length);

  readonly languages: { value: Language; label: string }[] = [
    { value: 'DE', label: 'Deutsch' },
    { value: 'EN', label: 'English' },
  ];

  readonly themes: { value: ColorTheme; label: string; icon: string }[] = [
    { value: 'LIGHT', label: 'Light', icon: 'light_mode' },
    { value: 'DARK', label: 'Dark', icon: 'dark_mode' },
    { value: 'SYSTEM', label: 'System', icon: 'brightness_auto' },
  ];

  onProfileChange() {
    this.hasUnsavedChanges.set(true);
  }

  onAddressChange() {
    this.hasUnsavedChanges.set(true);
  }

  onSettingsChange() {
    this.hasUnsavedChanges.set(true);
  }

  onSave() {
    // later: call API
    console.log('Saving:', this.profile(), this.address(), this.settings());
    this.hasUnsavedChanges.set(false);
  }

  onCancel() {
    this.hasUnsavedChanges.set(false);
  }

  onPhotoChange() {
    // later: S3 presigned upload
    console.log('Change photo');
  }

  onPhotoRemove() {
    this.profileImagePath.set(null);
    this.hasUnsavedChanges.set(true);
  }

  setTheme(theme: ColorTheme, type: 'web' | 'mobile') {
    if (type === 'web') {
      this.settings.update((s) => ({ ...s, webColorTheme: theme }));
    } else {
      this.settings.update((s) => ({ ...s, mobileColorTheme: theme }));
    }
    this.hasUnsavedChanges.set(true);
  }

  getInitials(): string {
    const f = this.profile().firstname.charAt(0);
    const l = this.profile().lastname.charAt(0);
    return (f + l).toUpperCase();
  }
}
