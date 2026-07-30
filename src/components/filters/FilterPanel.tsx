type Props = {
  diseases: string[];
  districts: string[];
  upazilas: string[];

  selectedDisease: string;
  selectedDistrict: string;
  selectedUpazila: string;

  onDiseaseChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onUpazilaChange: (value: string) => void;
};

export default function FilterPanel({
  diseases,
  districts,
  upazilas,

  selectedDisease,
  selectedDistrict,
  selectedUpazila,

  onDiseaseChange,
  onDistrictChange,
  onUpazilaChange,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">

      <h2 className="text-lg font-semibold mb-4">
        Dashboard Filters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Disease */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Disease
          </label>

          <select
            className="w-full border rounded-lg p-2"
            value={selectedDisease}
            onChange={(e) => onDiseaseChange(e.target.value)}
          >
            <option value="All">All Diseases</option>

            {diseases.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* District */}

        <div>
          <label className="block text-sm font-medium mb-2">
            District
          </label>

          <select
            className="w-full border rounded-lg p-2"
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
          >
            <option value="All">All Districts</option>

            {districts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Upazila
          </label>

          <select
            className="w-full border rounded-lg p-2"
            value={selectedUpazila}
            onChange={(e) => onUpazilaChange(e.target.value)}
          >
            <option value="All">All Upazilas</option>

            {upazilas.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

      </div>

    </div>
  );
}