'use client'

import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useField, usePayloadAPI } from '@payloadcms/ui'
import { Pipette, Link2, Check } from 'lucide-react'
import { THEME_PRESETS } from '../../theme/themePresets'

const isValidHex = (hex: string) => /^#([0-9A-F]{3}){1,2}$/i.test(hex)

const fieldToPresetKey: Record<string, keyof (typeof THEME_PRESETS)['luxury']['colors']> = {
  primaryColor: 'primary',
  secondaryColor: 'secondary',
  linkColor: 'link',
  bodyBgColor: 'background',
  defaultOverlayColor: 'surface',
  buttonBgColor: 'primary',
  buttonTextColor: 'text',
  buttonHoverBgColor: 'secondary',
  buttonHoverTextColor: 'text',
  iconBackgroundColor: 'primary',
  iconColor: 'text',
  headingColor: 'primary',
  textColor: 'text',
  sectionBgColor: 'background',
  subheadingColor: 'muted',
  titleColor: 'text',
  descriptionColor: 'muted',
  cardBgColor: 'surface',
  cardBorderColor: 'border',
  iconBgColor: 'primary',
  crossSectionBgColor: 'background',
  heroOverlayColor: 'background',
  ctaBgColor: 'primary',
  ctaTextColor: 'text',
  cardBackgroundColor: 'surface',
  tableHeaderBg: 'primary',
  tableBorderColor: 'border',
  teamCardBg: 'surface',
  teamNameColor: 'text',
  teamRoleColor: 'muted',
  testimonialBg: 'surface',
  testimonialTextColor: 'text',
  badgeBgColor: 'surface',
  badgeIconColor: 'primary',
  valueCardBg: 'surface',
  storyBg: 'background',
  serviceCardBg: 'surface',
  sectionBackgroundColor: 'background',
  bannerBg: 'primary',
  color: 'primary',
}

type Props = {
  path: string
  field: {
    name: string
    label?: string
  }
  size?: 'sm' | 'md'
}

export default function ThemeColorPicker({ path, field, size = 'sm' }: Props) {
  const { value, setValue } = useField<string>({ path })

  // Fetch the global Settings to get the real themePreset
  const [{ data: settingsData }] = usePayloadAPI(
    '/api/globals/settings', // adjust if your global slug differs
    { initialParams: { depth: 0 } },
  )

  const themePreset = settingsData?.themePreset || 'luxury'

  const preset = THEME_PRESETS[themePreset as keyof typeof THEME_PRESETS]
  const presetKey = fieldToPresetKey[field.name]
  const presetColor = presetKey ? preset.colors[presetKey] : '#000000'

  const [inputValue, setInputValue] = useState(value || presetColor)
  const [open, setOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  const usingTheme = !value

  useEffect(() => {
    if (!value) {
      setInputValue(presetColor)
    }
  }, [presetColor, value])

  const displayColor = useMemo(() => {
    return isValidHex(inputValue) ? inputValue : presetColor
  }, [inputValue, presetColor])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleColorChange = useCallback(
    (color: string) => {
      setInputValue(color)
      setValue(color)
    },
    [setValue],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setInputValue(val)
      if (isValidHex(val)) {
        setValue(val)
      }
    },
    [setValue],
  )

  const handleSwatchClick = useCallback(
    (color: string) => {
      setInputValue(color)
      setValue(color)
      setOpen(false)
    },
    [setValue],
  )

  const resetToTheme = useCallback(() => {
    setValue(undefined)
    setInputValue(presetColor)
    setOpen(false)
  }, [setValue, presetColor])

  const palette = useMemo(() => {
    return preset?.colors
      ? Object.entries(preset.colors).map(([key, color]) => ({ name: key, color }))
      : []
  }, [preset])

  // Sizes based on prop
  const triggerSize = size === 'sm' ? 'h-6 w-6' : 'h-8 w-8'
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'
  const popupLeft = size === 'sm' ? 'left-8' : 'left-10'

  return (
    <div className="relative inline-flex items-center" ref={popupRef}>
      {/* TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${triggerSize} relative rounded-lg border border-white/10 shadow-md transition-transform hover:scale-105 focus:outline-none`}
        style={{ backgroundColor: displayColor }}
        title={field.label ?? 'Pick a color'}
      >
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-black/10" />
        <Pipette className={`absolute inset-0 m-auto ${iconSize} text-white drop-shadow`} />
      </button>

      {/* POPUP */}
      {open && (
        <div
          className={`absolute ${popupLeft} top-0 z-50 mt-1 w-80 rounded-2xl border border-white/10 bg-[#0F172A] p-4 shadow-2xl backdrop-blur`}
        >
          {/* Color picker (large) */}
          <HexColorPicker
            color={displayColor}
            onChange={handleColorChange}
            className="!w-full !h-48 mb-3"
          />

          {/* Hex input + reset */}
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={presetColor}
                spellCheck={false}
                className="h-9 w-full rounded-lg border border-white/10 bg-[#111827] pl-3 pr-10 font-mono text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
              />
              <div
                className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white/20"
                style={{ backgroundColor: displayColor }}
              />
            </div>
            <button
              type="button"
              onClick={resetToTheme}
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs transition ${
                usingTheme
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              title="Reset to theme color"
            >
              <Link2 className="h-3 w-3" />
              {usingTheme ? 'Theme' : 'Reset'}
            </button>
          </div>

          {/* Theme swatches */}
          <p className="mb-1.5 text-[10px] font-medium text-gray-500">
            {preset?.label || themePreset} colors
          </p>
          <div className="grid grid-cols-8 gap-1.5">
            {palette.map(({ name, color }) => {
              const isActive = displayColor === color
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleSwatchClick(color)}
                  title={name}
                  className="group relative flex justify-center"
                >
                  <div
                    className={`h-7 w-7 rounded-md border-2 transition-all hover:scale-110 hover:shadow-md ${
                      isActive ? 'border-white scale-110' : 'border-white/10'
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {isActive && (
                      <Check className="absolute inset-0 m-auto h-3 w-3 text-white drop-shadow" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
