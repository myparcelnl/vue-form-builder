const translations: Record<string, string> = Object.freeze({
  carrier: 'Vervoerder',
  contact_details_title: 'Contactgegevens',
  first_name: 'Voornaam',
  form_optional_suffix: ' (optioneel)',
  form_submit: 'Verzenden',
  label_amount: 'Aantal labels',
  last_name: 'Achternaam',
  name: 'Naam',
  number: 'Huisnummer',
  package_info_title: 'Zendinginformatie',
  package_type: 'Pakkettype',
  package_type_digital_stamp: 'Digitale Postzegel',
  package_type_letter: 'Brief',
  package_type_mailbox: 'Brievenbuspakje',
  package_type_package: 'Pakket',
  package_type_pallet: 'Pallet',
  shipment_option_age_check: 'Leeftijdscontrole 18+',
  shipment_option_insurance: 'Verzekering',
  shipment_option_large_format: 'Groot formaat',
  shipment_option_only_recipient: 'Alleen ontvanger',
  shipment_option_return: 'Direct retour',
  shipment_option_same_day_delivery: 'Zelfde dag bezorgd',
  shipment_option_signature: 'Handtekening',
  shipment_options_title: 'Verzendopties',
  street: 'Straat',
  delivery_message: 'Bericht aan de bezorger',
  bsn: 'BSN',
});

export function translate(key: string): string {
  return translations[key] ?? key;
}
